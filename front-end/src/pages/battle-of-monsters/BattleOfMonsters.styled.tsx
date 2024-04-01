import styled from "@emotion/styled"
import { Button } from "@mui/material"
import { colors } from "../../constants/colors"

export const PageContainer = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '35px',
  maxWidth: '820px',
  margin: '0 auto'
}))
  
export const BattleSection = styled.section(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '25px'
}))
  
export const StartBattleButton = styled(Button)(({ disabled }) => ({
  background: disabled ? colors.lightGreen : colors.darkGreen,
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  borderRadius: '5px',
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '18px',
  lineHeight: '21px',
  color: `${colors.white} !important`,
  padding: '12px 30px',
  textTransform: 'capitalize',
  '&:hover': {
    background: colors.darkGreenHover
  }
}))

export const BattleMonsterSkillsContainer = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  width: '100%',
  gap: '8px',
}));

export const BattleMonsterSkill = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
}));

export const BattleMonsterSkillName = styled.span(() => ({
  color: 'black',
  fontSize: 'Roboto',
}));

export const BattleMonsterSkillBar = styled.div(() => ({
  width: '100%',
  height: '6px',
  background: '#D9D9D9',
  borderRadius: '4px'
}));

export const BattleMonsterSkillValueBar = styled.div(() => ({
  height: '6px',
  background: '#00FF00',
  borderRadius: '4px'
}));

export const BattleResultStamp = styled.div(() => ({
  color: "black",
  background: '#E1F8FF',
  border: '1px solid black',
  padding: '16px',
  display: 'flex',
  alignItems: 'center'
}));
