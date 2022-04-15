import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import CommonText from "../../atom/text/CommonText";
import Icon from "../../atom/icon/Icon";

const TodoWeatherBox = () => {
  const [data, setData] = useState({
    temp_min: 0,
    temp_max: 0,
    temp_icon: "",
    descript: "",
  });

  console.log(data);

  useEffect(() => {
    const getCoordsInfo = () => {
      if (localStorage.getItem("location")) {
        const location = JSON.parse(localStorage.getItem("location"));
        const fetchedData = axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=6720dd6382b0a7536a9ab1184aed41a1&units=metric`
          )
          .then((response) => {
            console.log(response);
            setData({
              temp_min: response.data.main.temp_min,
              temp_max: response.data.main.temp_max,
              icon: response.data.weather[0].icon,
              descript: response.data.weather[0].description,
            });
          });
      } else {
        return;
      }
    };
    getCoordsInfo();
  }, []);

  return (
    <Wrapper>
      <FirstChild>
        <WeatherIcon
          icon={`http://openweathermap.org/img/wn/${data.icon}@2x.png`}
        ></WeatherIcon>
      </FirstChild>
      <SecondChild>
        <FirstText>{data.descript}</FirstText>
        <SecondText>최저 : {data.temp_min}</SecondText>
        <ThirdText>최고 : {data.temp_max}</ThirdText>
      </SecondChild>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;

  border-radius: 15px;
  background-color: ${(props) => props.theme.palette["box"]};
  box-shadow: ${(props) => props.theme.shadow["boxShadow"]};
  @media (min-width: 360px) and (max-width: 600px) {
    flex-direction: column;
  }
`;

const WeatherIcon = styled(Icon)`
  width: 80px;
  height: 80px;
  background-color: #fff;
  border-radius: 15px;
  @media (min-width: 360px) and (max-width: 600px) {
    width: 50px;
    height: 50px;
  }
`;

const FirstChild = styled.div``;
const SecondChild = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > span {
    margin-bottom: 5px;
  }
`;

const FirstText = styled(CommonText)`
  font-size: 30px;

  @media (min-width: 360px) and (max-width: 600px) {
    font-size: 25px;
  }
`;
const SecondText = styled(CommonText)`
  font-size: 18px;
`;
const ThirdText = styled(CommonText)`
  font-size: 18px;
`;

export default TodoWeatherBox;
