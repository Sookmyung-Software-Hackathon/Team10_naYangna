import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { dbService } from "../fbase";
import Each from "../components/Each";
import Search from "../components/Search";

const Home = () => {
  const [numM,setNumM]=useState();
  const [numL,setNumL]=useState();
  const [name,setName]=useState();
  const [init,setInit]=useState(false);
  const [location,setLocation]=useState('');
  const [list,setList]=useState([]);
  const onLinkClick=()=>{
    window.open('https://pf.kakao.com/_ZxixlMs', '_blank');
  }
  useEffect(()=>{
    setInit(true);
    dbService.collection('left')
    .onSnapshot((snapshot) => {
      const listArray = snapshot.docs.map((doc) => ({
        id:doc.id,
        name:doc.data().name,
        leftm:doc.data().m,
        leftl:doc.data().l,
        left:parseInt(doc.data().m,10)+parseInt(doc.data().l,10)>0,
    }));
      setList(listArray);
    })
},[]);
  const onBtnClick=(e)=>{
    dbService.doc(`left/${e}`).get()
    .then((doc) => {
      setName(doc.data().name);
      setNumM(doc.data().m);
      setNumL(doc.data().l);
      setLocation(doc.data().location);
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
  }
  return (
    <>
      <Container>
        <Img onClick={()=>window.location.replace('/')} src="./image/logo2.png"/>
        <Box>
          <Map>
            <MapImg src="/image/naver_map1.png" alt="사진 출처: NAVER"></MapImg>
            {init && pinlist.map((each)=>(
              <div 
                onClick={()=>onBtnClick(each.id)}
                key={each.id}  
              >
                <Search 
                  key={each.id}
                  left={each.left}
                  top={each.top}
                />
              </div>
            ))}
            <Board>
              {location===''?(
                <Notice>지도에서 원하는 위치를 클릭하세요</Notice>
              ):(
                <Title>위치: {name} {location}<br/>
                  중형: {numM} 개<br/>
                  대형: {numL} 개
                </Title>
              )}
            </Board>
          </Map>
          <Board1>
            <Explain>상세정보는 하단의 건물명을 클릭하세요</Explain>
            <List>
              {list.map((each)=>(
                <Each
                  key={each.id}
                  list={each} 
                />
              ))}
            </List>
          </Board1>
          <Btn onClick={onLinkClick}>비치된 생리대가 없다면?</Btn>
        </Box>
      </Container>
    </>
  );
};
const Img=styled.img`
  width:50rem;
  margin: auto;
  margin-top: 2rem;
`;
const Btn=styled.button`
  font-size: 4rem;
  padding: 1rem 2rem;
  color: #009FF5;
  /* border: none; */
  background-color: white;
  border-radius: 20px;
  border: none;
  /* border: 2rem solid #009FF5; */
  margin: auto;
  width: 50rem;
  font-weight: 700;
`;
const List=styled.div`
  padding: 2rem 0;
  width: 80rem;
  display: grid;
  text-align: left;
  grid-template-columns: repeat(2,40rem);
  row-gap: 2rem;
  /* background-color: white; */
`;
const Container = styled.div`
  background-color: #aedafc;
  width: 95rem;
  margin:auto;
  text-align: center;
`;
const Explain=styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: gray;
  margin: 1rem 0;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;
const Map = styled.div`
  position: relative;
  text-align: left;
`;
const MapImg = styled.img`
  width: 80rem;
  border-radius: 10px;
  border: 2px solid;
  margin: 1rem 5rem 3rem;
`;


const pinlist=[
  {id:'soon',left: 41, top:4},
  {id:'myung',left: 22, top:19},
  {id:'jin',left: 27, top:5},
  {id:'sae',left: 24, top:28},
  {id:'student',left: 47, top:25},
  {id:'prime',left: 45, top:42},
  {id:'flaza',left: 29, top:40},
  {id:'science',left: 66, top:44},
  {id:'library',left: 65, top:57},
  {id:'art',left: 44.5, top:46},
  {id:'music',left: 30, top:51},
  {id:'medi',left: 38, top:62},

];

const Board = styled.div`
  /* display: block; */
  width: 80rem;
  background-color: white;
  margin: auto;
  margin-bottom: 4rem;
  border-radius: 10px;
  padding: 2rem 4rem;
`;
const Board1=styled(Board)`
  margin-bottom: 7rem;
`;
const Title = styled.div`
  font-size: 3.5rem;
`;
const Notice = styled.div`
  color: gray;
  font-size: 3rem;
`;


export default Home;
