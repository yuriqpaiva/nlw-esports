import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Background } from "../../components/Background";
import { styles } from "./styles";
import { useRoute } from "@react-navigation/native";
import { GameParams } from "../../@types/navigation";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { THEME } from "../../theme";
import logoImg from "../../assets/logo-nlw-esports.png";
import { Heading } from "../../components/Heading";
import { useNavigation } from "@react-navigation/native";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";
import { DuoMatch } from "../../components/DuoMatch";

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [selectedDiscordDuo, setSelectedDiscordDuo] = useState("");

  const { goBack } = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;

  useEffect(() => {
    fetch(`http://192.168.5.227:3333/games/${game.id}/ads`)
      .then((response) => response.json())
      .then((data) => setDuos(data));
  }, []);

  function handleGoBack() {
    goBack();
  }

  function handleCloseModal() {
    setSelectedDiscordDuo("");
  }

  async function getUserDiscord(adsId: string) {
    fetch(`http://192.168.5.227:3333/ads/${adsId}/discord`)
      .then((response) => response.json())
      .then(({ discord }) => setSelectedDiscordDuo(discord));
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />
          <View style={styles.right} />
        </View>
        <View style={styles.coverWrapper}>
          <Image
            source={{ uri: game.bannerUrl }}
            style={styles.cover}
            resizeMode={"cover"}
          />
        </View>

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          style={styles.containerList}
          contentContainerStyle={
            duos.length > 0 ? styles.contentList : styles.emptyListContent
          }
          data={duos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => getUserDiscord(item.id)} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          )}
        />
        <DuoMatch
          visible={selectedDiscordDuo.length > 0}
          onClose={handleCloseModal}
          discord={selectedDiscordDuo}
        />
      </SafeAreaView>
    </Background>
  );
}
