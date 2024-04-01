import { Monster } from "../../models/interfaces/monster.interface";
import { BattleMonsterSkill, BattleMonsterSkillBar, BattleMonsterSkillName, BattleMonsterSkillValueBar, BattleMonsterSkillsContainer } from "../../pages/battle-of-monsters/BattleOfMonsters.styled";
import { BattleMonsterCard, BattleMonsterImg, BattleMonsterTitle } from "./MonsterBattleCard.styled";

type MonsterCardProps = {
    monster?: Monster | null;
    title?: string;
    monsterImgUrl?: string;
    skills?: {
        attack: number;
        hp: number;
        defense: number;
        speed: number;
    }
}

const MonsterBattleCard: React.FC<MonsterCardProps> = ({ title, monsterImgUrl, skills }) => {
    return (
        <BattleMonsterCard centralized>
            <BattleMonsterImg src={monsterImgUrl}></BattleMonsterImg>

            <BattleMonsterTitle>{title!}</BattleMonsterTitle>

            {skills && (

            <BattleMonsterSkillsContainer>
                <BattleMonsterSkill>
                    <BattleMonsterSkillName>Hp</BattleMonsterSkillName>

                    <BattleMonsterSkillBar>
                        <BattleMonsterSkillValueBar style={{width: `${skills?.hp || 0 || 0}%`}}></BattleMonsterSkillValueBar>
                    </BattleMonsterSkillBar>
                </BattleMonsterSkill>
                <BattleMonsterSkill>
                    <BattleMonsterSkillName>Attack</BattleMonsterSkillName>

                    <BattleMonsterSkillBar>
                        <BattleMonsterSkillValueBar style={{width: `${skills?.attack || 0 || 0}%`}}></BattleMonsterSkillValueBar>
                    </BattleMonsterSkillBar>
                </BattleMonsterSkill>
                <BattleMonsterSkill>
                    <BattleMonsterSkillName>Defense</BattleMonsterSkillName>

                    <BattleMonsterSkillBar>
                        <BattleMonsterSkillValueBar style={{width: `${skills?.defense || 0}%`}}></BattleMonsterSkillValueBar>
                    </BattleMonsterSkillBar>
                </BattleMonsterSkill>
                <BattleMonsterSkill>
                    <BattleMonsterSkillName>Speed</BattleMonsterSkillName>

                    <BattleMonsterSkillBar>
                        <BattleMonsterSkillValueBar style={{width: `${skills?.speed || 0}%`}}></BattleMonsterSkillValueBar>
                    </BattleMonsterSkillBar>
                </BattleMonsterSkill>
            </BattleMonsterSkillsContainer>
            )}

        </BattleMonsterCard>
    )
}

export { MonsterBattleCard };

