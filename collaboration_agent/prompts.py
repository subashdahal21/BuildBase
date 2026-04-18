#this will be the prompt that the agent would use for LLM calling
PROJECT_ANALYSIS_PROMPT = """
You are an AI startup collaboration analyst.

A founder submitted a startup/project idea. Your job is to extract the team and skill requirements needed to build it.

Return VALID JSON only with this exact shape:
{{
  "projectType": "string",
  "summary": "string",
  "targetUsers": ["string"],
  "requiredRoles": ["string"],
  "requiredSkills": ["string"],
  "businessNeeds": ["string"],
  "investorTags": ["string"],
  "projectStage": "string"
}}

Rules:
- Return only JSON
- No markdown
- No explanation
- Infer realistic roles and skills
- Keep summary under 30 words
- Use concise professional role names
- projectStage should be one of: "Idea", "Prototype", "MVP", "Early Traction"

Project idea:
{project_text}
"""

COLLAB_INVITE_PROMPT = """
You are generating a short collaboration invitation inside a startup collaboration platform.

Return VALID JSON only with this exact shape:
{{
  "subject": "string",
  "message": "string"
}}

Rules:
- Return only JSON
- No markdown
- No explanation
- Keep the message under 80 words
- Be personalized, concise, and professional
- Mention why the collaborator is a fit

Project summary:
{summary}

Required roles:
{roles}

Required skills:
{skills}

Matched collaborator profile:
{user_profile}
"""

INVESTOR_ANALYSIS_PROMPT = """
You are an AI investment preference analyst.

Return VALID JSON only with this exact shape:
{{
  "preferredSectors": ["string"],
  "preferredStages": ["string"],
  "preferredTechnologies": ["string"],
  "targetMarkets": ["string"],
  "riskAppetite": "string",
  "investmentStyle": "string"
}}

Rules:
- Return only JSON
- No markdown
- No explanation
- Infer concise investor preferences from the text
- preferredStages should use values like: Idea, Prototype, MVP, Early Traction

Investor profile text:
{investor_text}
"""

INVESTOR_NOTE_PROMPT = """
You are generating a short investor-project fit explanation.

Return VALID JSON only with this exact shape:
{{
  "investmentNote": "string"
}}

Rules:
- Return only JSON
- No markdown
- No explanation
- Keep it under 70 words
- Explain why this project may fit the investor's interests

Investor preferences:
{investor_preferences}

Project:
{project_profile}
"""