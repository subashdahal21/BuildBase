from schemas import InvestorAnalysis, ProjectProfile


def normalize(items):
    return [item.strip().lower() for item in items]


def overlap_ratio(expected, actual):
    expected_set = set(normalize(expected))
    actual_set = set(normalize(actual))

    if not expected_set:
        return 0.0

    return len(expected_set & actual_set) / len(expected_set)


def stage_fit(preferred_stages, project_stage):
    return 1.0 if project_stage.strip().lower() in normalize(preferred_stages) else 0.0


def investor_project_score(investor: InvestorAnalysis, project: ProjectProfile) -> float:
    sector_score = overlap_ratio(investor.preferredSectors, project.domainTags)
    tech_score = overlap_ratio(investor.preferredTechnologies, project.technologies)
    market_score = overlap_ratio(investor.targetMarkets, project.targetUsers)
    project_stage_score = stage_fit(investor.preferredStages, project.projectStage)
    funding_score = 1.0 if project.lookingForFunding else 0.0

    return (
        0.40 * sector_score +
        0.20 * tech_score +
        0.15 * market_score +
        0.15 * project_stage_score +
        0.10 * funding_score
    )


def explain_investor_match(investor: InvestorAnalysis, project: ProjectProfile):
    reasons = []

    matching_sectors = list(set(normalize(investor.preferredSectors)) & set(normalize(project.domainTags)))
    if matching_sectors:
        reasons.append(f"Sector fit: {', '.join(matching_sectors[:2])}")

    matching_tech = list(set(normalize(investor.preferredTechnologies)) & set(normalize(project.technologies)))
    if matching_tech:
        reasons.append(f"Technology fit: {', '.join(matching_tech[:2])}")

    if stage_fit(investor.preferredStages, project.projectStage):
        reasons.append(f"Stage fit: {project.projectStage}")

    if project.lookingForFunding:
        reasons.append("Currently open to funding")

    return reasons