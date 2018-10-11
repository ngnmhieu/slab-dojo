package de.otto.teamdojo.repository;

import de.otto.teamdojo.domain.PersonSkill;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the PersonSkill entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PersonSkillRepository extends JpaRepository<PersonSkill, Long> {

}
