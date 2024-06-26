import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";
import UserDataManager from '../components/UserDataManager';
import { serverConfig } from '../config';
import BottomNav from "../components/BottomNav";
import TopNav_2 from "../components/TopNav_2";

const Home = () => {
  const navigation = useNavigation();
  const [name, setName] = useState(null);
  const [astronomyData, setAstronomyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nazwy,setNazwy] = useState();
  const [punkty,setPunkty] = useState();



  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = 'apiKey';
        const lat = '50.886';
        const long = '20.641';
        const apiUrl = `https://api.ipgeolocation.io/astronomy?apiKey=${apiKey}&lat=${lat}&long=${long}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        setAstronomyData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };


    const readUserData = async () => {
      const userData = await UserDataManager.getUserData();
      if (userData) {
        setName(userData.name);
      } else {
        console.log('Unable to read user data from cache');
      }
    };

    const fetchRanks = async () => {
      try {
          const url = `${serverConfig.apiUrl}:${serverConfig.port}/quiz`;
          const response = await fetch(url);
          const data = await response.json();
          data.sort((a, b) => b.points - a.points);
          const top5Results = data.slice(0, 5);
          console.log(top5Results);
          const namesString = top5Results.map(result => result.name).join('\n');
          const pointsString = top5Results.map(result => `${result.points} punktów`).join('\n');
          setNazwy(namesString);
          setPunkty(pointsString);
          return data[0];
      } catch (error) {
          console.error('Error fetching routes', error);
      }
    };

    fetchRanks();
    readUserData();
    fetchData();
  }, [navigation]);


  return (
    <View style={styles.home1}>
      <View style={styles.panele}>
        <View style={styles.fazaKsiyca1}>
          <View style={styles.kafelek}>
          <Image
            style={styles.giphy3Icon}
            contentFit="cover"
            source={require("../assets/giphy-32.png")}
          />
          {loading ? (
            <Text>Loading...</Text>
            ) : (
              <View style={styles.ksiezycBox}>
                <Text style={styles.ksiezycText}>Date: {astronomyData?.date}</Text>
                <Text style={styles.ksiezycText}>Time: {astronomyData?.current_time}</Text>
                <Text style={styles.ksiezycText}>Moon Distance: {parseFloat(astronomyData?.moon_distance).toFixed(2)} KM</Text>
                <Text style={styles.ksiezycText}>Moon Altitude: {parseFloat(astronomyData?.moon_altitude).toFixed(2)} KM</Text>
              </View>
            )}
            </View>
          <Text style={styles.fazaKsiyca}>Faza księżyca</Text>
        </View>
        <View style={styles.ranking}>
          <View style={styles.kafelek1} />
          <Pressable
            style={styles.przyciskWyboru}
            onPress={() => navigation.navigate("Quiz")}
          />
          <Text style={styles.przejdDoQuizu}>Przejdź do quizu</Text>
          <Image
            style={styles.signOutSqureFillIcon}
            contentFit="cover"
            source={require("../assets/sign-out-squre-fill1.png")}
          />
          <Text style={styles.punktw200Punktw}>{punkty}</Text>
          <Text style={styles.pokerGabriel12Maxas}>{nazwy}</Text>
          <Text style={styles.rankingWQuizie}>Ranking w quizie</Text>
        </View>
      </View>
      <Text style={styles.witajUser}>Witaj, {name}</Text>

      <TopNav_2 />
      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  kafelek: {
    position: "absolute",
    height: "81.06%",
    width: 300, 
    top: "18.94%", 
    left: "50%",
    marginLeft: -150, 
    borderRadius: Border.br_3xs,
    backgroundColor: Color.dark,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
  },
  giphy3Icon: {
    position: "absolute",
    height: "100%",
    width: "32%",
    top: "1%",
    right: "0%",
    bottom: "0%",
    left: "68%",
    borderRadius: Border.br_3xs,
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
  },
  zanikajcy735Widocznoci: {
    position: "absolute",
    top: "34.85%",
    left: "9%",
    fontSize: FontSize.size_xs,
    letterSpacing: 0.3,
    fontWeight: "500",
    fontFamily: FontFamily.montserratMedium,
    color: Color.colorDarkgray_100,
    textAlign: "left",
  },
  fazaKsiyca: {
    position: "absolute",
    height: "40.91%",
    marginLeft: -99,
    top: "0%",
    left: "50%",
    fontSize: FontSize.size_base,
    fontWeight: "500",
    fontFamily: FontFamily.montserratMedium,
    color: Color.text,
    textAlign: "center",
    width: 198,
  },
  fazaKsiyca1: {
    position: "relative",
    width: 300,
    height: 132,
  },
  kafelek1: {
    position: "absolute",
    height: "86.17%",
    width: "100%",
    top: "13.83%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    borderRadius: Border.br_3xs,
    backgroundColor: Color.dark,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
  },
  przyciskWyboru: {
    position: "absolute",
    height: "15.43%",
    marginLeft: -84,
    top: "75.53%",
    bottom: "9.04%",
    left: "50%",
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorGainsboro,
    borderStyle: "solid",
    borderColor: Color.secondary,
    borderWidth: 2,
    width: 162,
  },
  przejdDoQuizu: {
    position: "absolute",
    height: "7.98%",
    width: "43%",
    top: "79.26%",
    left: "30%",
    fontSize: FontSize.size_xs,
    fontWeight: "700",
    fontFamily: FontFamily.nav,
    color: Color.text,
    textAlign: "center",
  },
  signOutSqureFillIcon: {
    position: "absolute",
    height: "9.04%",
    width: "5.67%",
    top: "78.72%",
    right: "68.67%",
    bottom: "12.23%",
    left: "25.67%",
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
  },
  punktw200Punktw: {
    position: "absolute",
    top: "25.53%",
    left: "62.33%",
    fontSize: FontSize.size_xs,
    letterSpacing: 0.3,
    fontWeight: "700",
    fontFamily: FontFamily.nav,
    color: Color.secondary,
    textAlign: "left",
  },
  pokerGabriel12Maxas: {
    position: "absolute",
    top: "25.53%",
    left: "9%",
    fontSize: FontSize.size_xs,
    letterSpacing: 0.3,
    fontWeight: "500",
    fontFamily: FontFamily.montserratMedium,
    color: Color.colorDarkgray_100,
    textAlign: "left",
  },
  rankingWQuizie: {
    position: "absolute",
    height: "28.72%",
    marginLeft: -142,
    top: "0%",
    left: "50%",
    fontSize: FontSize.size_base,
    fontWeight: "500",
    fontFamily: FontFamily.montserratMedium,
    color: Color.text,
    textAlign: "center",
    width: 285,
  },
  ranking: {
    position: "relative",
    width: 300,
    height: 188,
    marginTop: 21,
  },
  panele: {
    position: "absolute",
    top: 195,
    left: 60,
    width: 300,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  witajUser: {
    position: "absolute",
    marginLeft: -195,
    top: 123,
    left: "50%",
    fontSize: FontSize.size_13xl,
    fontWeight: "800",
    fontFamily: FontFamily.montserratExtraBold,
    color: Color.text,
    textAlign: "center",
    width: 389,
    height: 73,
  },
  menu: {
    position: "absolute",
    top: "7.69%",
    left: "9.7%",
    fontSize: FontSize.size_base,
    letterSpacing: 0.4,
    fontWeight: "700",
    fontFamily: FontFamily.nav,
    color: Color.secondary,
    textAlign: "center",
  },
  icon3: {
    height: "100%",
    width: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
  },
  ikonaPowiadomie: {
    position: "absolute",
    left: "91.97%",
    top: "3.85%",
    right: "0%",
    bottom: "3.85%",
    width: "8.03%",
    height: "92.31%",
  },
  icon4: {
    height: "100%",
    width: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
  },
  ikonaMenu: {
    position: "absolute",
    left: "0%",
    top: "0%",
    right: "91.97%",
    bottom: "7.69%",
    width: "8.03%",
    height: "92.31%",
  },
  icon5: {
    height: "100%",
    width: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
  },
  ikonaWyszukiwarki: {
    position: "absolute",
    left: "76.59%",
    top: "7.69%",
    right: "15.38%",
    bottom: "0%",
    width: "8.03%",
    height: "92.31%",
  },
  grnyPasekNawigacyjny: {
    position: "absolute",
    top: 61,
    left: 26,
    width: 299,
    height: 26,
  },
  home1: {
    position: "relative",
    borderRadius: Border.br_21xl,
    backgroundColor: Color.colorGray_500,
    flex: 1,
    width: "100%",
    height: 780,
  },
  ksiezycBox: {
    alignItems: 'left', 
    padding: 20,
    paddingLeft: 15,
  },
  ksiezycText: {
    color: Color.colorDarkgray_100,
    fontSize: FontSize.size_xs,
    letterSpacing: 0.3,
    fontWeight: "500",
    fontFamily: FontFamily.montserratMedium,
  },
});

export default Home;
