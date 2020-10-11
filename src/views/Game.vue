<template>
  <div>
    <v-app>
      <v-app-bar prominent app color="white">
        <v-spacer></v-spacer>
        <v-toolbar-title>
          You are
          <br />
          the MURDERER
          <br />
          Round 1 of 3
          <br />
          Discuss!
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <template v-slot:extension>
          <v-tabs v-model="tab" centered icons-and-text>
            <v-tabs-slider></v-tabs-slider>

            <v-tab href="#tab-1">
              Guesses
              <v-icon>mdi-help</v-icon>
            </v-tab>

            <v-tab href="#tab-2">
              Cards
              <v-icon>mdi-fingerprint</v-icon>
            </v-tab>

            <v-tab href="#tab-3">
              Tiles
              <v-icon>mdi-account</v-icon>
            </v-tab>
          </v-tabs>
        </template>
      </v-app-bar>
      <v-main>
        <v-container>
          <v-tabs-items v-model="tab">
            <v-tab-item value="tab-1">
              <v-card flat>
                <v-card-text>
                  <v-col cols="12" class="py-2">
                    <p>Me</p>
                    <v-btn-toggle v-model="text" dense>
                      <v-btn>
                        Left
                      </v-btn>
                      <v-btn>
                        Center
                      </v-btn>
                      <v-btn>
                        Right
                      </v-btn>
                      <v-btn>
                        Justify
                      </v-btn>
                    </v-btn-toggle>
                  </v-col>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item value="tab-2">
              <v-card flat>
                <v-card-text class="text-center">
                  <div v-for="player in gameDataArray" :key="player.playerList">
                    <v-container pa-3>
                      <h3 justify="centre">{{ player.playerList }}</h3>
                      <v-row justify="center">Means</v-row>
                      <v-row justify="center" no-gutters>
                        <div v-for="mean in player.means" :key="mean">
                          <v-btn outlined small tile>{{ mean }}</v-btn>
                        </div>
                      </v-row>
                      <v-row justify="center">Clues</v-row>
                      <v-row justify="center">
                        <div v-for="clue in player.clues" :key="clue">
                          <v-btn outlined small tile>{{ clue }}</v-btn>
                        </div>
                      </v-row>
                    </v-container>
                  </div>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item value="tab-3">
              <v-card flat>
                <v-card-text>
                  <v-col cols="12" class="py-2">
                    <p>Text Options</p>

                    <!-- <v-btn-toggle v-model="text" tile group>
                        <v-btn value="left">
                          yes
                        </v-btn>

                        <v-btn value="center">
                          yep
                        </v-btn>

                        <v-btn value="right">
                          wooo
                        </v-btn>

                        <v-btn value="justify">
                          yepepep
                        </v-btn>
                      </v-btn-toggle> -->
                  </v-col></v-card-text
                >
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-container>
      </v-main>
      <v-bottom-navigation>
        <v-btn>
          <span>Solve the Crime</span>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn>
          <span>Go to Next Round</span>
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>

        <v-btn>
          <span>Quit</span>
          <v-icon>mdi-exit-to-app</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-app>
  </div>
</template>

<script>
// @ is an alias to /src
// import CreateGame from "@/components/CreateGame.vue";
// import store from "../store";

export default {
  name: "game",
  data() {
    return {
      tab: null,
      text: "center",
      gameData: {
        playerList: ["a", "b", "c", "d", "e"],
        means: [
          ["Alcohol", "Amoeba", "Arsenic", "Arson"],
          ["Axe", "Bamboo Tip", "Bat", "Belt"],
          ["Bite And Tear", "Blender", "Blood Release", "Box Cutter"],
          ["Brick", "Bury", "Candlestick", "Chainsaw"],
          ["Chemicals", "Cleaver", "Crutch", "Dagger"]
        ],
        clues: [
          ["Air Conditioning", "Ants", "Antique", "Apple"],
          ["Badge", "Bandage", "Banknote", "Bell"],
          ["Betting Chips", "Blood", "Bone", "Book"],
          ["Bracelet", "Bread", "Briefs", "Broom"],
          ["Bullet", "Button", "Cake", "Calender"]
        ]
      },
      gameDataArray: [],
      gameDataList: [
        {
          clues: ["Air Conditioning", "Ants", "Antique", "Apple"],
          means: ["Alcohol", "Amoeba", "Arsenic", "Arson"],
          playerList: "a"
        },
        {
          clues: ["Badge", "Bandage", "Banknote", "Bell"],
          means: ["Axe", "Bamboo Tip", "Bat", "Belt"],
          playerList: "b"
        },
        {
          clues: ["Betting Chips", "Blood", "Bone", "Book"],
          means: ["Bite And Tear", "Blender", "Blood Release", "Box Cutter"],
          playerList: "c"
        },
        {
          clues: ["Bracelet", "Bread", "Briefs", "Broom"],
          means: ["Brick", "Bury", "Candlestick", "Chainsaw"],
          playerList: "d"
        },
        {
          clues: ["Bullet", "Button", "Cake", "Calender"],
          means: ["Chemicals", "Cleaver", "Crutch", "Dagger"],
          playerList: "e"
        }
      ]
    };
  },

  mounted() {
    for (let i = 0; i < this.gameData.playerList.length; i++) {
      this.gameDataArray.push({
        playerList: this.gameData.playerList[i],
        means: this.gameData.means[i],
        clues: this.gameData.clues[i]
      });
    }
    console.log(this.gameDataArray);
  }
};
</script>
