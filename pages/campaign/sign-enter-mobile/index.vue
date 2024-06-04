<template>
    <div id="sign-enter-mobile">
        <img
            class="img-banner"
            src="./asset/image/landing06-top.png"
            alt=""
        >
        <a
            href="https://panel.eterex.com/sign-enter-mobile"
            class="btn"
            title="Eterex"
        ><img
                class="heartbeat"
                src="./asset/image/landing06-btn.png"
                alt=""
            ></a>

    </div>
</template>
  
<script>
import { generateMetaData } from '@/utils/Helpers'

export default {
    layout: 'empty',
    data() {
        return {
            showModal: false,
        }
    },
    head: generateMetaData('بدون احراز هویت معامله کن'),
}
</script>
  
<style lang="scss" scoped>
@import '@/assets/responsive.scss';


#sign-enter-mobile {
    width: 100%;
    margin: 0 auto;
    display: block;
    position: relative;
    font-family: "peyda";
    height: 100vh;
    background: linear-gradient(180deg, #0F34F4 -10.77%, #000 91.03%);
    height: 100vh;

    @include respond(lg){
        max-width: 420px;
    }

    .img-banner {
        width: 70%;
        ;
        margin: auto;
        display: block;
    }

    .btn {
        width: 60%;
        height: 45px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 3%;
    }

    .btn img {
        width: 90%;
    }


    .heartbeat {
        -webkit-animation: heartbeat 1.5s ease-in-out infinite both;
        animation: heartbeat 1.5s ease-in-out infinite both;
    }

    /**
 * ----------------------------------------
 * animation heartbeat
 * ----------------------------------------
 */
    @-webkit-keyframes heartbeat {
        from {
            -webkit-transform: scale(1);
            transform: scale(1);
            -webkit-transform-origin: center center;
            transform-origin: center center;
            -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
        }

        10% {
            -webkit-transform: scale(0.91);
            transform: scale(0.91);
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
        }

        17% {
            -webkit-transform: scale(0.98);
            transform: scale(0.98);
            -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
        }

        33% {
            -webkit-transform: scale(0.87);
            transform: scale(0.87);
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
        }

        45% {
            -webkit-transform: scale(1.2);
            transform: scale(1.2);
            -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
        }
    }

    @keyframes heartbeat {
        from {
            -webkit-transform: scale(1);
            transform: scale(1);
            -webkit-transform-origin: center center;
            transform-origin: center center;
            -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
        }

        10% {
            -webkit-transform: scale(0.91);
            transform: scale(0.91);
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
        }

        17% {
            -webkit-transform: scale(0.98);
            transform: scale(0.98);
            -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
        }

        33% {
            -webkit-transform: scale(0.87);
            transform: scale(0.87);
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
        }

        45% {
            -webkit-transform: scale(1.2);
            transform: scale(1.2);
            -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
        }
    }
}
</style>
  