package de.otto.teamdojo.web.rest;

import com.codahale.metrics.annotation.Timed;
import de.otto.teamdojo.service.AchievableSkillService;
import de.otto.teamdojo.service.dto.AchievableSkillDTO;
import de.otto.teamdojo.web.rest.util.HeaderUtil;
import de.otto.teamdojo.web.rest.util.PaginationUtil;
import org.json.JSONException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PersonAchievableSkillResource {

    private final Logger log = LoggerFactory.getLogger(PersonAchievableSkillResource.class);

    private final AchievableSkillService achievableSkillService;

    public PersonAchievableSkillResource(AchievableSkillService achievableSkillService) {
        this.achievableSkillService = achievableSkillService;
    }

    @GetMapping("/persons/{id}/achievable-skills")
    @Timed
    public ResponseEntity<List<AchievableSkillDTO>> getAchievableSkills(
        @PathVariable Long id,
        @RequestParam(name = "levelId", required = false, defaultValue = "") List<Long> levelIds,
        @RequestParam(name = "badgeId", required = false, defaultValue = "") List<Long> badgeIds,
        @RequestParam(name = "filter", required = false, defaultValue = "") List<String> filterNames,
        Pageable pageable) {
        log.debug("REST request to get AchievableSkills for Team; {}", id);
        Page<AchievableSkillDTO> page = achievableSkillService.findAllByPersonAndLevelAndBadge(id, levelIds, badgeIds, filterNames, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/persons/" + id + "/achievable-skills");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/persons/{personId}/achievable-skills/{skillId}")
    @Timed
    public ResponseEntity<AchievableSkillDTO> getAchievableSkills(
        @PathVariable Long personId,
        @PathVariable Long skillId) {
        log.debug("REST request to get AchievableSkills for Person {} - Skill {}", personId, skillId);
        AchievableSkillDTO skill = achievableSkillService.findAchievablePersonSkill(personId, skillId);
        if (skill == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(skill, HttpStatus.OK);
        }
    }

    @PutMapping("/persons/{id}/achievable-skills")
    @Timed
    public ResponseEntity<AchievableSkillDTO> updateAchievableSkill(@PathVariable Long id, @RequestBody AchievableSkillDTO achievableSkill) throws JSONException {
        AchievableSkillDTO result = achievableSkillService.updateAchievablePersonSkill(id, achievableSkill);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("AchievableSkillDTO", result.getSkillId().toString()))
            .body(result);
    }
}
