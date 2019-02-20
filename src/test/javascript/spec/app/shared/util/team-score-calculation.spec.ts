import { ITeam, Team } from 'app/shared/model/team.model';
import { ISkill, Skill } from 'app/shared/model/skill.model';
import { Badge, IBadge } from 'app/shared/model/badge.model';
import { TeamScoreCalculation } from 'app/shared';
import { ITeamSkill, TeamSkill } from 'app/shared/model/team-skill.model';
import * as moment from 'moment';

fdescribe('TeamScoreCalculation', function() {
    describe('calcTeamScore', function() {
        const team: ITeam = new Team();
        const skill: ISkill = new Skill();
        const teamSkill: ITeamSkill = new TeamSkill();
        const badge: IBadge = new Badge();
        skill.id = 1;
        teamSkill.skillId = skill.id;
        team.skills = [].concat(teamSkill);
        teamSkill.completedAt = moment();

        it('should return zero', function() {
            const result = TeamScoreCalculation.calcTeamScore(team, [teamSkill], [badge]);
            expect(result).toBe(0);
        });

        it('should round result up', function() {
            skill.score = 474.50000000000006;
            const result = TeamScoreCalculation.calcTeamScore(team, [skill], [badge]);
            expect(result).toBe(475);
        });

        it('should always round result up', function() {
            skill.score = 474.00000000000006;
            const result = TeamScoreCalculation.calcTeamScore(team, [skill], [badge]);
            expect(result).toBe(475);
        });
    });
});
