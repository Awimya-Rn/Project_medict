import sys
import os
from contextlib import asynccontextmanager
from pathlib import Path
import pickle
import joblib
import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Literal, List, Dict, Any
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
else:
    print("⚠️ Warning: GEMINI_API_KEY not found. AI descriptions will not work.")

BASE_DIR = Path(__file__).resolve().parent
ML_DIR = BASE_DIR.parent / "ML" 

ANEMIA_MODEL_PATH = ML_DIR / "anemia" / "anemia_model.pkl"
POST_NATAL_MODEL_PATH = ML_DIR / "PostPartum" / "post_natal_model.pkl"
STUNTING_MODEL_PATH = ML_DIR / "Stunting" / "stunting_model.pkl"

ml_models = {}

def get_gemini_explanation(context: str, prediction_result: str, input_data: Dict[str, Any]) -> str:
    """
    Mengirim prompt ke Gemini untuk mendapatkan penjelasan dan saran kesehatan.
    """
    if not GEMINI_API_KEY:
        return "Deskripsi AI tidak tersedia (API Key missing)."

    try:
        model = genai.GenerativeModel('gemini-2.5-flash') 
        
        prompt = f"""
        Anda adalah asisten kesehatan AI yang bijak dan empatik.
        
        Konteks: Prediksi Kesehatan {context}
        Hasil Prediksi Model ML: {prediction_result}
        Data Pasien: {input_data}
        
        Tugas:
        1. Jelaskan secara singkat apa arti hasil prediksi tersebut bagi pasien dalam bahasa Indonesia yang mudah dimengerti.
        2. Berikan 3 saran singkat dan praktis berdasarkan data tersebut.
        3. Selalu akhiri dengan saran untuk berkonsultasi ke dokter/profesional medis.
        
        Format output: Paragraf singkat saja, jangan gunakan markdown formatting yang terlalu kompleks.
        """
        
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print(f"❌ Gemini Error: {e}")
        return "Maaf, saat ini kami tidak dapat membuat penjelasan detail karena gangguan koneksi AI."


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        if ANEMIA_MODEL_PATH.exists():
            with open(ANEMIA_MODEL_PATH, "rb") as f:
                ml_models["anemia"] = pickle.load(f)
            print(f"✅ Anemia model loaded from {ANEMIA_MODEL_PATH}")
        else:
            print(f"⚠️ Anemia model file not found at {ANEMIA_MODEL_PATH}")
    except Exception as e:
        print(f"❌ Error loading Anemia model: {e}")
  
    try:
        if POST_NATAL_MODEL_PATH.exists():
            with open(POST_NATAL_MODEL_PATH,'rb') as f:
                ml_models["post_nata"] = pickle.load(f)
            print(f"✅ Post Natal model loaded from {POST_NATAL_MODEL_PATH}")
        else:
            print(f"⚠️ Post Natal model file not found at {POST_NATAL_MODEL_PATH}")
    except Exception as e:
        print(f"❌ Error loading Post Natal model: {e}")
  
    try:
        if STUNTING_MODEL_PATH.exists():
            ml_models["stunting"] = joblib.load(STUNTING_MODEL_PATH)
            print(f"✅ Stunting model loaded from {STUNTING_MODEL_PATH}")
        else:
            print(f"⚠️ Stunting model file not found at {STUNTING_MODEL_PATH}")
    except Exception as e:
        print(f"❌ Error loading Stunting model: {e}")

    yield
    
    ml_models.clear()

app = FastAPI(title="Health Prediction API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AnemiaInput(BaseModel):
    gender: int
    hemoglobin: float
    mch: float
    mchc: float
    mcv: float

class PostPartumInput(BaseModel):
    age: Literal["25-30", "30-35", "35-40", "40-45", "45-50"]
    feeling_sad_or_tearful: Literal["Yes", "No", "Sometimes"]
    irritable_towards_baby_and_partner: Literal["Yes", "No", "Sometimes"]
    trouble_sleeping_at_night: Literal["Yes", "No", "Two or more days a week"]
    problems_concentrating_or_making_decision: Literal["Yes", "No", "Often"]
    overeating_or_loss_of_appetite: Literal["Yes", "No", "Not at all"]
    feeling_of_guilt: Literal["Yes", "No", "Maybe"]
    problems_of_bonding_with_baby: Literal["Yes", "No", "Sometimes"]
    suicide_attempt: Literal["Yes", "No", "Not interested to say"]

class StuntingInput(BaseModel):
    umur_bulan: int
    jenis_kelamin: str
    tinggi_badan_cm: float


def preprocess_post_partum_data(data: PostPartumInput) -> pd.DataFrame:
    input_dict = data.dict()
    df = pd.DataFrame([input_dict])
    
    age_mapping = {'25-30':1, '30-35':2, '35-40':3, '40-45':4, '45-50':5}
    df['age'] = df['age'].map(age_mapping)
    
    categories = {
        'feeling_sad_or_tearful': ['No', 'Sometimes', 'Yes'],
        'irritable_towards_baby_and_partner': ['No', 'Sometimes', 'Yes'],
        'trouble_sleeping_at_night': ['No', 'Two or more days a week', 'Yes'],
        'problems_concentrating_or_making_decision': ['No', 'Often', 'Yes'],
        'overeating_or_loss_of_appetite': ['No', 'Not at all', 'Yes'],
        'feeling_of_guilt': ['Maybe', 'No', 'Yes'],
        'problems_of_bonding_with_baby': ['No', 'Sometimes', 'Yes'],
        'suicide_attempt': ['No', 'Not interested to say', 'Yes']
    }
    df_processed = df.copy()
    
    for col, vals in categories.items():
        user_val = df_processed[col].iloc[0]
        for val in vals:
            new_col_name = f"{col}_{val}"
            df_processed[new_col_name] = 1 if user_val == val else 0
        df_processed.drop(col, axis=1, inplace=True)
    return df_processed

# --- ENDPOINTS ---

@app.get("/")
def home():
    return {
        "message": "Health Prediction API is Running",
        "loaded_models": list(ml_models.keys())
    }

@app.post("/predict_anemic")
def predict_anemia(data: AnemiaInput):
    model = ml_models.get("anemia")
    if not model:
        raise HTTPException(status_code=503, detail="Anemia model is not loaded.")

    features = np.array([[
        data.gender,
        data.hemoglobin,
        data.mch,
        data.mchc,
        data.mcv
    ]])

    try:
        prediction = model.predict(features)
        result_label = "Anemic" if prediction[0] == 1 else "Not Anemic"
        
        # --- GEMINI INTEGRATION ---
        description = get_gemini_explanation(
            context="Anemia Check",
            prediction_result=result_label,
            input_data=data.dict()
        )
        
        return {
            "prediction_code": int(prediction[0]),
            "result": result_label,
            "description": description 
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@app.post("/predict_post_natal")
def predict_post_natal(data: PostPartumInput):
    model = ml_models.get("post_nata")
    if not model:
        raise HTTPException(status_code=503, detail="Post Natal model is not loaded.")
  
    try:
        processed_df = preprocess_post_partum_data(data)
        prediction = model.predict(processed_df)
        result_code = int(prediction[0])
        result_label = "Feeling Anxious (Yes)" if result_code == 1 else "Normal (No)"
        
        # --- GEMINI INTEGRATION ---
        description = get_gemini_explanation(
            context="Post Partum Depression Screening",
            prediction_result=result_label,
            input_data=data.dict()
        )

        return{
            "prediction_code": result_code,
            "result": result_label,
            "description": description, 
            "input_summary": data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@app.post("/predict_stunting")
def predict_stunting(data: StuntingInput):
    model = ml_models.get('stunting')
    if not model:
        raise HTTPException(status_code=503, detail="Stunting models are not loaded.")
    try:
        gender_map = {"laki-laki": 0, "perempuan": 1}
        gender_lower = data.jenis_kelamin.lower()
        gender_encoded = gender_map.get(gender_lower, 0) 

        features = np.array([[data.umur_bulan, gender_encoded, data.tinggi_badan_cm]])
        prediction_code = int(model.predict(features)[0])
        
        status_map = {0: "Normal", 1: "Severely Stunted", 2: "Stunted", 3: "Tinggi"}
        result_label = status_map.get(prediction_code, "Unknown")
        
        description = get_gemini_explanation(
            context="Stunting (Tumbuh Kembang Anak)",
            prediction_result=result_label,
            input_data=data.dict()
        )
        
        return{
            "prediction_code": prediction_code,
            "result": result_label,
            "description": description,
            "input_received": data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")