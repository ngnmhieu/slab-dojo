package de.otto.teamdojo.service;

import de.otto.teamdojo.service.dto.AchievableSkillDTO;
import org.json.JSONException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AchievableSkillService {

    /**
     * Get the skills that are achievable for the given team and belong to one of the given levels or badges
     */
    Page<AchievableSkillDTO> findAllByTeamAndLevelAndBadge(Long teamId, List<Long> levelIds, List<Long> badgeIds, List<String> filterNames, Pageable pageable);

    Page<AchievableSkillDTO> findAllByPersonAndLevelAndBadge(Long personId, List<Long> levelIds, List<Long> badgeIds, List<String> filter, Pageable pageable);

    /**
     * Updates an achievable skill
     */
    AchievableSkillDTO updateAchievableSkill(Long teamId, AchievableSkillDTO achievableSkill) throws JSONException;

    AchievableSkillDTO updateAchievablePersonSkill(Long personId, AchievableSkillDTO achievableSkill) throws JSONException;

    /**
     * Finds AchievableSkill by teamId and skillId
     */
    AchievableSkillDTO findAchievableSkill(Long teamId, Long skillId);

    AchievableSkillDTO findAchievablePersonSkill(Long personId, Long skillId);
}
