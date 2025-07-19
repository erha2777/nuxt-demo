<script setup lang="ts">
const { $gsap, $ScrollTrigger } = useNuxtApp();
const box = ref<HTMLElement | null>(null);

onMounted(() => {
    // ($gsap as any).to(box.value, {
    //     x: 300,
    //     scrollTrigger: {
    //         trigger: box.value,
    //         start: 'top 80%',
    //         end: 'bottom 20%',
    //         debug: true,
    //         toggleActions: 'play none reverse none',
    //     },
    // });

    // ($gsap as any).to(box.value, {
    //     scrollTrigger: box.value, // 当“.box”进入视口时启动动画（一次）
    //     x: 500,
    //     pin: true,
    // });

    // let tl = ($gsap as any).timeline({
    //     //是的，我们可以将其添加到整个时间线中！
    //     scrollTrigger: {
    //         trigger: '.container', // 触发器
    //         pin: true, // 激活时锁定触发元素
    //         start: 'top top', // 当触发器的顶部碰到视口的顶部时
    //         end: '+=500', // 在滚动到起始位置500像素后结束
    //         scrub: 1, // 平滑擦洗，需要1秒才能“赶上”滚动条
    //         snap: {
    //             snapTo: 'labels', // 捕捉到时间线中最接近的标签
    //             duration: { min: 0.2, max: 3 }, // 捕捉动画应至少为0.2秒，但不超过3秒（由速度决定）
    //             delay: 0.2, // 在执行捕捉之前，请在最后一个滚动事件后等待0.2秒
    //             ease: 'power1.inOut', // 快照动画的易用性（默认为“power3”）
    //         },
    //         onEnter: ({ progress, direction, isActive }: any) => {
    //             console.log(progress, direction, isActive);
    //         },
    //     },
    // });

    // // 向时间线添加动画和标签
    // tl.addLabel('start')
    //     .from('.box p', { scale: 0.3, rotation: 45, autoAlpha: 0 })
    //     .addLabel('color')
    //     .from('.box', { backgroundColor: '#28a92b' })
    //     .addLabel('spin')
    //     .to('.box', { rotation: 360 })
    //     .addLabel('end');

    // ($gsap as any).from('.test-img', { scrollTrigger: '.test-img', duration: 2, scale: 0.3 });

    ($gsap as any).timeline({
        scrollTrigger: {
            trigger: '.container4',
            pin: true, // 锁定元素
            scrub: 1, // 更平滑的滚动跟随
            once: true, // 只触发一次
            onUpdate: (self: any) => {
                const progress = self.progress;
                if (progress < 0.25) {
                    ($gsap as any).to('.container4 li', { opacity: 0, y: 20, duration: 0.1 });
                } else if (progress < 0.5) {
                    ($gsap as any).to('.container4 li:nth-child(1)', { opacity: 1, y: 0, duration: 0.1 });
                    ($gsap as any).to('.container4 li:nth-child(2), .container4 li:nth-child(3)', { opacity: 0, y: 20, duration: 0.1 });
                } else if (progress < 0.75) {
                    ($gsap as any).to('.container4 li:nth-child(1), .container4 li:nth-child(2)', { opacity: 1, y: 0, duration: 0.1 });
                    ($gsap as any).to('.container4 li:nth-child(3)', { opacity: 0, y: 20, duration: 0.1 });
                } else {
                    ($gsap as any).to('.container4 li', { opacity: 1, y: 0, duration: 0.1 });
                }
            },
        },
    });

    let tween = ($gsap as any).timeline({
        scrollTrigger: {
            trigger: '.container2',
            start: 'top 80%',
            end: 'bottom bottom',
            scrub: 1,
            once: true, // 只触发一次
            onUpdate: (self: any) => {
                const width = 68 + self.progress * 32; // 从68%过渡到100%
                const height = 80 + self.progress * 20; // 从80%过渡到100%
                ($gsap as any).to('.container2-container', { width: `${width}%`, height: `${height}%`, duration: 0.1 });
            },
        },
    });
    tween.to('.container2-content', { opacity: 1, y: 0, duration: 0.1 });
});

onUnmounted(() => {
    ($ScrollTrigger as any).getAll().forEach((trigger: any) => trigger.kill()); // 清理资源 [3](@ref)
});
</script>

<template>
    <div class="test">
        <section class="container1">
            <img src="/images/bg1.png" alt="" />
        </section>

        <section class="container2">
            <div class="container2-container">
                <!-- <video src="https://s.xiaopeng.com/xp-fe/mainsite/2023/home/explore-v2.mp4"></video> -->
                <img src="/images/bg2.png" alt="" />
            </div>
            <div class="container2-content">
                <div class="container2-title">低自重</div>
                <div class="container2-desc">
                    同电量自重最轻，同自重电量最大 <br />
                    魔塔电池和魔磐架构双重加持，行业同等车型下，轻200-600kg <br />
                    航母级980L、T700高强钢，复合材料，七合一电控、热管理等集成化设计。
                </div>
            </div>
        </section>
        <section class="container3"></section>
        <section class="container4">
            <div class="container4-title">高可靠</div>
            <ul>
                <li>
                    <p>500万km等效验证</p>
                    <p>每个新产品经过超5轮耐久试验验证，等效实际运营500万km</p>
                </li>
                <li>
                    <p>60万公里市场验证</p>
                    <p>2022年4月车辆，单车最长行驶超60万km，平均每年超20万km</p>
                </li>
                <li>
                    <p>高极端环境验证</p>
                    <p>在-35℃低温、50℃高温、4700m高原、高湿、高腐蚀等恶劣环境下，正常运营</p>
                </li>
            </ul>
        </section>
    </div>
</template>

<style lang="scss" scoped>
.test {
    // height: 500vh;
    padding-bottom: 200vh;
    .container1 {
        img {
            width: 100%;
            height: auto;
        }
    }
    .container2 {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100vh;
        &-content {
            opacity: 0;
            position: absolute;
            transform: translate3d(0px, 50px, 0px);
            top: 82px;
            left: 189px;
            z-index: 2;
        }
        &-title {
            font-size: 48px;
            line-height: normal;
            letter-spacing: 0.04em;
            color: #fff;
        }
        &-desc {
            margin-top: 22px;
            font-size: 16px;
            line-height: 188.45%;
            color: #fff;
        }
        &-container {
            position: absolute;
            width: 68%;
            height: 80%;
            overflow: hidden;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        video,
        img {
            width: 100vw;
            height: 100vh;
            object-fit: cover;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
    .container3 {
        height: 908px;
    }
    .container4 {
        height: 908px;
        background-color: #020a0f;
        color: #fff;
        padding: 82px 189px;
        &-title {
            font-size: 48px;
            line-height: normal;
            letter-spacing: 0.04em;
        }
        li {
            margin-top: 24px;
            opacity: 0;
            p:first-child {
                color: #edc489;
                font-size: 36px;
                font-weight: 500;
                line-height: 188.45%;
            }
        }
    }
}
</style>
