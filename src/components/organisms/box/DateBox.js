import styled from "styled-components";
import SubTitle from "../../moldecule/text/SubTitle";
import Date from "../../moldecule/etc/Date";

const DateBox = ({ onChange }) => {
  return (
    <Section>
      <SubTitle text={"오늘은 언제인가요?"} />
      <Date onChange={onChange} />
    </Section>
  );
};

const Section = styled.section`
  margin-bottom: 40px;
`;

export default DateBox;
