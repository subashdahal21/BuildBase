import json
from pathlib import Path

from schemas import ProjectProfile
from ai_service import analyze_investor, generate_investor_note
from investor_matching import investor_project_score, explain_investor_match

BASE_DIR = Path(__file__).resolve().parent
PROJECTS_FILE = BASE_DIR / "data" / "mock_projects.json"


def load_mock_projects():
    with open(PROJECTS_FILE, "r", encoding="utf-8") as f:
        projects = json.load(f)
    return [ProjectProfile(**project) for project in projects]


def run_investor_agent(investor_text: str):
    analysis = analyze_investor(investor_text)
    projects = load_mock_projects()

    ranked = []

    for project in projects:
        if not project.lookingForFunding:
            continue

        score = investor_project_score(analysis, project)
        reasons = explain_investor_match(analysis, project)

        ranked.append({
            "project": project,
            "score": score,
            "reasons": reasons
        })

    ranked.sort(key=lambda item: item["score"], reverse=True)
    top_projects = ranked[:5]

    results = []

    for match in top_projects:
        note = generate_investor_note(analysis, match["project"].model_dump())

        results.append({
            "projectId": match["project"].id,
            "title": match["project"].title,
            "score": round(match["score"], 3),
            "reasons": match["reasons"],
            "investmentNote": note
        })

    return {
        "investorAnalysis": analysis.model_dump(),
        "topProjects": results
    }