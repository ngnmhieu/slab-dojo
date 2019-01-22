package de.otto.teamdojo.service.mapper;

import de.otto.teamdojo.domain.*;
import de.otto.teamdojo.service.dto.TrainingDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Training and its DTO TrainingDTO.
 */
@Mapper(componentModel = "spring", uses = {SkillMapper.class})
public interface TrainingMapper extends EntityMapper<TrainingDTO, Training> {



    default Training fromId(Long id) {
        if (id == null) {
            return null;
        }
        Training training = new Training();
        training.setId(id);
        return training;
    }
}
