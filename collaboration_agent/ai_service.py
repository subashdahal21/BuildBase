import json
import os
from groq import Groq
from dotenv import load_dotenv

from schemas import ProjectAnalysis, InviteMessage
from prompts import PROJECT_ANALYSIS_PROMPT, COLLAB_INVITE_PROMPT

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

MODEL_NAME = "llama-3.3-70b-versatile"

def extract_json(text: str) -> dict:
    """
    Extracts JSON safely from model output.
    Handles cases where model adds extra text.
    """
    text = text.strip()

    try:
        return json.loads(text)
    except json.JSONDecodeError:
        # Try extracting JSON block
        start = text.find("{")
        end = text.rfind("}")
        if start == -1 or end == -1:
            raise ValueError("No JSON found in AI response")

        return json.loads(text[start:end + 1])

def analyze_project(project_text: str) -> ProjectAnalysis:
    try:
        prompt = PROJECT_ANALYSIS_PROMPT.format(project_text=project_text)
        response = client.chat.completions.create(
            model=MODEL_NAME,
            temperature=0.2,
            messages=[
                {"role": "system", "content": "You extract structured startup requirements. Return ONLY JSON."},
                {"role": "user", "content": prompt}
            ]
        )
        content = response.choices[0].message.content
        parsed = extract_json(content)
        return ProjectAnalysis(**parsed)
    except Exception:
        return ProjectAnalysis(
            projectType="Unknown",
            summary="AI-generated collaboration project",
            targetUsers=["Founders", "Collaborators"],
            requiredRoles=["Frontend Engineer", "Backend Engineer"],
            requiredSkills=["React", "Python"],
            businessNeeds=["Product Strategy"],
            investorTags=["AI", "Startup"],
            projectStage="Idea"
        )

def generate_invite_message(project_analysis: ProjectAnalysis, user_profile: dict) -> InviteMessage:
    prompt = COLLAB_INVITE_PROMPT.format(
        summary=project_analysis.summary,
        roles=", ".join(project_analysis.requiredRoles),
        skills=", ".join(project_analysis.requiredSkills),
        user_profile=json.dumps(user_profile)
    )

    response = client.chat.completions.create(
        model=MODEL_NAME,
        temperature=0.5,
        messages=[
            {
                "role": "system",
                "content": "You generate short collaboration invites. Return ONLY JSON."
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    content = response.choices[0].message.content

    parsed = extract_json(content)

    return InviteMessage(**parsed)