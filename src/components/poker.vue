<template>
  <div class="poker-main">
    <el-card class="poker-base">
      <el-steps :active="active" finish-status="success" simple style="margin-top: 20px">
        <el-step title="基本牌组"></el-step>
        <el-step title="洗牌"></el-step>
        <el-step title="发牌"></el-step>
      </el-steps>
      <div class="step-active" v-if="active === 0">
        <p>54张基本牌组：</p>
        <p class="poker-list-item">{{mainPoker}}</p>
        <div class="step-active-btn">
          <el-button @click="goActive(1)" type="primary">进行洗牌</el-button>
        </div>
      </div>
      <div class="step-active" v-if="active === 1">
        <p>洗牌结果：
          <el-button @click="shuffling" type="primary">手动重新洗牌</el-button>
        </p>
        <p v-if="poker.length > 0">{{poker}}</p>
        <div class="step-active-btn">
          <el-button @click="goActive(0)">上一步</el-button>
          <el-button @click="goActive(2)" type="primary">选择这一副牌</el-button>
        </div>
      </div>
      <div class="step-active" v-if="active === 2">
        <p>玩家数量：
          <el-input-number v-model="player" controls-position="right" :min="2" :max="4" disabled></el-input-number>
        </p>
        <p>启动地主：
          <el-switch
            v-model="isBoss"
            active-text="有地主"
            inactive-text="无地主" disabled>
          </el-switch>
        </p>
        <div class="step-active-btn">
          <el-button @click="goActive(1)">上一步</el-button>
          <el-button @click="goPushPoker" type="primary">进行发牌</el-button>
        </div>
      </div>
    </el-card>
    <div class="left-player player-list">
      <div class="header">
        <h2>player1：地主</h2>
      </div>
    </div>
    <div class="right-player player-list">
      <div class="header">
        <h2>player2：阿姨</h2>
      </div>
    </div>
    <div class="bottom-player player-list">
      <div class="header">
        <h2>player3：卢本伟</h2>
        <el-button @click="getCoffee">给阿姨倒一杯卡布奇诺</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import mainData from "../config/config";
  import baseFunction from "../utils/common";

  export default {
    name: "poker",
    data() {
      return {
        poker: [],
        mainPoker: mainData.mainAllPoker,
        active: 0,
        player: 3,
        isBoss: false
      }
    },
    methods: {
      shuffling() {
        this.poker = baseFunction.superShuffling(this.mainPoker);
      },
      goActive(active) {
        if (this.active === 0) {
          this.shuffling();
        }
        this.active = active;
      },
      goPushPoker() {

      },
      getCoffee() {
        this.$message.success('卢本伟给阿姨倒了一杯卡布奇诺')
      }
    }
  }
</script>

<style scoped lang="scss">
  .poker-main {
    width: 100%;
    height: 100%;
    position: relative;

    .poker-base {
      width: 600px;
      height: 350px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -80%);

      /deep/ .el-card__body {
        height: 100%;
      }

      .step-active {
        width: 100%;
        height: calc(100% - 140px);
        position: relative;
        margin-top: 30px;

        .step-active-btn {
          position: absolute;
          bottom: 0;
          right: 0;
        }
      }
    }

    .player-list {
      box-sizing: border-box;
      padding: 15px;

      .header {
        color: #ccc;
      }
    }


    .left-player {
      width: 300px;
      height: calc(100% - 200px);
      border-right: 1px solid #ccc;
      position: absolute;
      left: 0;
      top: 0;
    }

    .right-player {
      width: 300px;
      height: calc(100% - 200px);
      border-left: 1px solid #ccc;
      position: absolute;
      right: 0;
      top: 0;
    }

    .bottom-player {
      width: 100%;
      height: 200px;
      border-top: 1px solid #ccc;
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }
</style>
