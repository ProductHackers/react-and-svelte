<script>
  import { fade } from "svelte/transition";
  import { fly } from "svelte/transition";
  import { cubicInOut } from "svelte/easing";

  const URL_S3_SA_STATICS =
    "//wga-prod-public.s3-eu-west-1.amazonaws.com/sabbatic/ph-sa-0009/statics";

  let time;
  let interval;
  let openCTA = false;

  function startTimer(duration) {
    const startedTime = new Date();
    let timer = duration * 1000 - (new Date().getTime() - startedTime.getTime());
    let minutes, seconds;
    function countDown() {
      minutes = parseInt(timer / 60000, 10);
      seconds = parseInt((timer / 1000) % 60, 10);
      const secondsCopy = seconds
        ? `${seconds} ${seconds === 0 ? "" : "segundo"}${seconds > 1 ? "s" : ""}`
        : "";
      const minutesCopy = minutes
        ? `${minutes} ${minutes === 0 ? "" : "minuto"}${minutes > 1 ? "s" : ""}`
        : "";
      time = `${minutesCopy} ${secondsCopy}`;
      if (time && !openCTA) {
        openCTA = true;
      }
      timer = duration * 1000 - (new Date().getTime() - startedTime.getTime());
      if (timer < 0) {
        clearInterval(interval);
        openCTA = false;
      }
    }
    interval = setInterval(countDown, 1000);
    countDown();
  }

  const handleOpenCTA = () => {
    openCTA = true;
    startTimer(60);
  };

  function handleClose(event) {
    clearInterval(interval);
    openCTA = false;
  }

  function handleClick(event) {
    window.location = "https://producthackers.com";
    clearInterval(interval);
    openCTA = false;
  }

  handleOpenCTA();
</script>

{#if openCTA}
  <div class="popup-sabbatic" transition:fade="{{ delay: 300, duration: 250 }}">
    <div
      class="cta-container"
      transition:fly="{{
        delay: 0,
        duration: 450,
        x: 0,
        y: -700,
        opacity: 0.5,
        easing: cubicInOut
      }}"
    >
      <button on:click="{handleClose}" class="close-button">
        <img src="{URL_S3_SA_STATICS}/close.svg" alt="Icono Cerrar" />
      </button>
      <p class="top-title">Consigue la siguiente oferta gratis</p>
      <p class="time">{time}</p>
      <div class="gift-container">
        <img src="{URL_S3_SA_STATICS}/gift.svg" alt="Imagen Regalo" />
      </div>
      <p class="save-money">Te enseñamos a ahorrar tiempo y dinero</p>
      <button on:click="{handleClick}" class="cta-button"> ¡Lo quiero! </button>
      <p class="clients">Clientes como Google ya lo han probado</p>
    </div>
  </div>
{/if}

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

  @mixin isMobile {
    @media (max-width: 900px) {
      @content;
    }
  }

  :global(body) {
    height: 500vh;
  }

  .popup-sabbatic {
    font-family: "Poppins", sans-serif;
    -webkit-font-smoothing: antialiased;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2147483640;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.39);
    padding: 16px;

    @include isMobile() {
      align-items: flex-end;
      padding: 0;
    }

    .cta-container {
      width: 575px;
      height: 526px;
      padding: 17px 24px 55px 24px;
      position: relative;
      border-radius: 8px;
      background-color: #1cc0cd;
      display: flex;
      flex-direction: column;
      &:after {
        content: "";
        display: block;
        width: 100%;
        height: 1px;
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        background-color: rgba(255, 255, 255, 0.2);
      }

      @include isMobile() {
        width: 100%;
        height: 523px;
        border-radius: 15px;
        padding: 35px 24px 32px 24px;
      }

      .close-button {
        width: 36px;
        height: 36px;
        padding: 12px;
        background-color: rgba(255, 255, 255, 0.08);
        position: absolute;
        top: 0;
        right: 0;
        border: 0;
        border-top-right-radius: 8px;
        border-bottom-left-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        @include isMobile() {
          border-top-right-radius: 15px;
          border-bottom-left-radius: 15px;
        }

        img {
          width: 12px;
          height: 12px;
          object-fit: contain;
        }
      }

      .top-title {
        width: 527px;
        height: 32px;
        margin: 0;
        padding: 0;
        font-size: 20px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: normal;
        text-align: center;
        color: #ffffff;
        align-self: center;

        @include isMobile() {
          max-width: 250px;
          height: 48px;
          font-size: 16px;
          padding: 0 24px;
        }
      }

      .time {
        height: 48px;
        margin: 16px 0 32px 0;
        align-self: center;
        padding: 0;
        font-size: 40px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.2;
        letter-spacing: normal;
        text-align: center;
        color: #ffffff;

        @include isMobile() {
          height: 32px;
          max-width: 250px;
          font-size: 24px;
          line-height: 1.33;
          margin: 16px 0 24px 0;
        }
      }

      .gift-container {
        margin: 0 0 24px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;

        img {
          width: 143.5px;
          height: 146px;
          object-fit: contain;

          @include isMobile() {
            width: 204px;
            height: 148px;
            line-height: 1.33;
          }
        }
      }

      .save-money {
        margin: 0 0 24px 0;
        width: 334px;
        height: 24px;
        font-size: 16px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: normal;
        text-align: center;
        align-self: center;
        color: #ffffff;

        @include isMobile() {
          max-width: 250px;
          height: 48px;
          margin: 0 0 16px 0;
        }
      }

      .cta-button {
        align-self: center;
        height: 56px;
        width: 208px;
        padding: 16px 24px;
        margin: 0 0 32px 0;
        border-radius: 8px;
        background-color: #ef7c12;
        font-size: 16px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: normal;
        text-align: center;
        color: #ffffff;
        border: none;

        @include isMobile() {
          width: 100%;
          max-width: 327px;
          height: 56px;
          margin: 0 0 24px 0;
        }
      }

      .clients {
        height: 20px;
        font-size: 10px;
        font-weight: 600;
        font-stretch: normal;
        align-self: center;
        font-style: normal;
        line-height: 2;
        letter-spacing: normal;
        text-align: center;
        color: #ffffff;

        @include isMobile() {
          max-width: 327px;
          height: 20px;
        }
      }
    }
  }
</style>
