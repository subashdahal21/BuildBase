from schemas import ProjectAnalysis, UserProfile


def normalize(items):
    return [item.strip().lower() for item in items]


def overlap_ratio(required, actual):
    required_set = set(normalize(required))
    actual_set = set(normalize(actual))

    if not required_set:
        return 0.0

    return len(required_set & actual_set) / len(required_set)

ROLE_ALIASES = {
    "full stack developer": ["frontend engineer", "backend engineer", "full stack developer"],
    "data scientist": ["ml engineer", "data scientist", "ai engineer"],
    "ux designer": ["ui/ux designer", "ux designer", "product designer"],
    "ui/ux designer": ["ui/ux designer", "ux designer", "product designer"],
    "ml engineer": ["ml engineer", "data scientist", "ai engineer"],
    "backend engineer": ["backend engineer", "full stack developer"],
    "frontend engineer": ["frontend engineer", "full stack developer"]
}

def role_match(required_roles, user_role):
    user_role_normalized = user_role.strip().lower()

    for required_role in required_roles:
        required_normalized = required_role.strip().lower()

        # get aliases or fallback to itself
        aliases = ROLE_ALIASES.get(required_normalized, [required_normalized])

        if user_role_normalized in aliases:
            return 1.0

    return 0.0
def experience_fit(level):
    value = level.strip().lower()

    if value == "senior":
        return 1.0
    if value == "intermediate":
        return 0.8
    if value == "junior":
        return 0.6
    return 0.5


def collaborator_score(project: ProjectAnalysis, user: UserProfile) -> float:
    skill_score = overlap_ratio(project.requiredSkills, user.skills)
    role_score = role_match(project.requiredRoles, user.role)
    interest_score = overlap_ratio(project.investorTags, user.interests)
    exp_score = experience_fit(user.experienceLevel)
    availability_score = 1.0 if user.available else 0.0

    return (
        0.45 * skill_score +
        0.25 * role_score +
        0.15 * interest_score +
        0.10 * exp_score +
        0.05 * availability_score
    )


def explain_match(project: ProjectAnalysis, user: UserProfile):
    reasons = []

    matching_skills = list(set(normalize(project.requiredSkills)) & set(normalize(user.skills)))
    if matching_skills:
        reasons.append(f"Matching skills: {', '.join(matching_skills[:3])}")

    if role_match(project.requiredRoles, user.role):
        reasons.append(f"Role fit: {user.role}")

    matching_interests = list(set(normalize(project.investorTags)) & set(normalize(user.interests)))
    if matching_interests:
        reasons.append(f"Shared interests: {', '.join(matching_interests[:2])}")

    if user.available:
        reasons.append("Available for collaboration")

    return reasons