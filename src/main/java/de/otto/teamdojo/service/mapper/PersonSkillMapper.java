package de.otto.teamdojo.service.mapper;

import de.otto.teamdojo.domain.*;
import de.otto.teamdojo.service.dto.PersonSkillDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity PersonSkill and its DTO PersonSkillDTO.
 */
@Mapper(componentModel = "spring", uses = {SkillMapper.class, PersonMapper.class})
public interface PersonSkillMapper extends EntityMapper<PersonSkillDTO, PersonSkill> {

    @Mapping(source = "skill.id", target = "skillId")
    @Mapping(source = "person.id", target = "personId")
    PersonSkillDTO toDto(PersonSkill personSkill);

    @Mapping(source = "skillId", target = "skill")
    @Mapping(source = "personId", target = "person")
    PersonSkill toEntity(PersonSkillDTO personSkillDTO);

    default PersonSkill fromId(Long id) {
        if (id == null) {
            return null;
        }
        PersonSkill personSkill = new PersonSkill();
        personSkill.setId(id);
        return personSkill;
    }
}
