import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../../app/hooks"
import { MonsterBattleCard } from "../../components/monster-battle-card/MonsterBattleCard"
import { MonstersList } from "../../components/monsters-list/MonstersList"
import { Title } from "../../components/title/Title"
import { Monster } from "../../models/interfaces/monster.interface"
import { fetchMonstersData } from "../../reducers/monsters/monsters.actions"
import { selectMonsters, selectSelectedMonster } from "../../reducers/monsters/monsters.selectors"
import { MonsterService } from "../../reducers/monsters/monsters.service"
import { BattleResultStamp, BattleSection, PageContainer, StartBattleButton } from "./BattleOfMonsters.styled"

const BattleOfMonsters = () => {
    const [computerMonster, setComputerMonster] = useState<Monster | null>(null);
    const [winner, setWinner] = useState<Monster | null>(null);

    const dispatch = useAppDispatch()

    const monsters = useSelector(selectMonsters)
    const selectedMonster = useSelector(selectSelectedMonster)

    useEffect(() => {
        dispatch(fetchMonstersData())
    }, [dispatch]);

    const handleMonsterSelect = (selectedMonsterId: string) => {
        setWinner(null);
        const randomMonster = monsters[Math.floor(Math.random()*monsters.length || 0)]

        if(randomMonster.id === selectedMonsterId) {
            handleMonsterSelect(selectedMonsterId);
            return;
        }

        setComputerMonster(randomMonster);
    }

    const handleStartBattleClick = async () => {
        if(!selectedMonster || !computerMonster) {
            return
        }

        const response = await MonsterService.startBattle({
            monsterAId: Number(selectedMonster.id),
            monsterBId: Number(computerMonster.id)
        });

        const { winner: battleWinner } = response;

        setWinner(battleWinner)
    }

    return (
        <PageContainer>
            <Title>Battle of Monsters</Title>

            <MonstersList handleSelectMonster={handleMonsterSelect} monsters={monsters} />

            {winner && (
                <BattleResultStamp>
                    {`${winner?.name} wins!`}
                </BattleResultStamp>
            )}

            <BattleSection>
                <MonsterBattleCard monsterImgUrl={selectedMonster?.imageUrl} skills={selectedMonster ? {
                    attack: selectedMonster.attack,
                    hp: selectedMonster.hp,
                    speed: selectedMonster.speed,
                    defense: selectedMonster.defense,                    
                } : undefined} title={selectedMonster?.name || "Player"}></MonsterBattleCard>
                <StartBattleButton data-testid="start-battle-button"  disabled={selectedMonster === null} onClick={handleStartBattleClick}>Start Battle</StartBattleButton>
                <MonsterBattleCard   monsterImgUrl={computerMonster?.imageUrl} skills={computerMonster ? {
                    attack: computerMonster.attack,
                    hp: computerMonster.hp,
                    speed: computerMonster.speed,
                    defense: computerMonster.defense,                    
                } : undefined} title={computerMonster?.name || "Player"}></MonsterBattleCard>
            </BattleSection>
        </PageContainer>
    )
}

export { BattleOfMonsters }
