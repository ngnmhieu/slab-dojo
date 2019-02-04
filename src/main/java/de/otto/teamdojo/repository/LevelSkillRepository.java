package de.otto.teamdojo.repository;

import de.otto.teamdojo.domain.LevelSkill;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the LevelSkill entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LevelSkillRepository extends JpaRepository<LevelSkill, Long>, JpaSpecificationExecutor<LevelSkill> {

}
