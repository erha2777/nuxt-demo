<script setup>
const { $gsap, $ScrollTrigger } = useNuxtApp();

onMounted(() => {
    console.debug('-------->', '$gsap', $gsap);
    console.debug('-------->', '$ScrollTrigger ', $ScrollTrigger);

    let sections = $gsap.utils.toArray('.panel');

    let scrollTween = $gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: 'none', // <-- IMPORTANT!
        scrollTrigger: {
            trigger: '.container',
            pin: true,
            scrub: 0.1,
            //snap: directionalSnap(1 / (sections.length - 1)),
            end: '+=3000',
        },
    });

    $gsap.set('.box-1, .box-2', { y: 100 });
    $ScrollTrigger.defaults({ markers: { startColor: 'white', endColor: 'white' } });

    // red section
    $gsap.to('.box-1', {
        y: -130,
        duration: 2,
        ease: 'elastic',
        scrollTrigger: {
            trigger: '.box-1',
            containerAnimation: scrollTween,
            start: 'left center',
            toggleActions: 'play none none reset',
            id: '1',
        },
    });

    // gray section
    $gsap.to('.box-2', {
        y: -120,
        backgroundColor: '#1e90ff',
        ease: 'none',
        scrollTrigger: {
            trigger: '.box-2',
            containerAnimation: scrollTween,
            start: 'center 80%',
            end: 'center 20%',
            scrub: true,
            id: '2',
        },
    });

    // purple section
    $ScrollTrigger.create({
        trigger: '.box-3',
        containerAnimation: scrollTween,
        toggleClass: 'active',
        start: 'center 60%',
        id: '3',
    });

    // green section
    $ScrollTrigger.create({
        trigger: '.green',
        containerAnimation: scrollTween,
        start: 'center 65%',
        end: 'center 51%',
        onEnter: () => console.log('enter'),
        onLeave: () => console.log('leave'),
        onEnterBack: () => console.log('enterBack'),
        onLeaveBack: () => console.log('leaveBack'),
        onToggle: (self) => console.log('active', self.isActive),
        id: '4',
    });

    // only show the relevant section's markers at any given time
    $gsap.set('.gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end', { autoAlpha: 0 });
    ['red', 'gray', 'purple', 'green'].forEach((triggerClass, i) => {
        $ScrollTrigger.create({
            trigger: '.' + triggerClass,
            containerAnimation: scrollTween,
            start: 'left 30%',
            end: i === 3 ? 'right right' : 'right 30%',
            markers: false,
            onToggle: (self) => $gsap.to('.marker-' + (i + 1), { duration: 0.25, autoAlpha: self.isActive ? 1 : 0 }),
        });
    });

    // helper function for causing the sections to always snap in the direction of the scroll (next section) rather than whichever section is "closest" when scrolling stops.
    // function directionalSnap(increment) {
    //   let snapFunc = gsap.utils.snap(increment);
    //   return (raw, self) => {
    //     let n = snapFunc(raw);
    //     return Math.abs(n - raw) < 1e-4 || (n < raw) === self.direction < 0 ? n : self.direction < 0 ? n - increment : n + increment;
    //   };
    // }

    // making the code pretty/formatted.
    // PR.prettyPrint();

   
});

 // 💚 This just adds the GSAP link to this pen, don't copy this bit
    // import { GSAPInfoBar } from 'https://codepen.io/GreenSock/pen/vYqpyLg.js';
    // new GSAPInfoBar({ link: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/', position: 'top' });
    // 💚 Happy tweening!
</script>
<template>
    <div style="background-color: #000; color: #fff">
        <div class="description">
            <div>
                <h1>Horizontal "<code>containerAnimation</code>"</h1>
                <p>
                    Scroll this page vertically and you'll see a horizontal fake-scrolling section where a container is animated on the x-axis using a ScrollTrigger animation. With
                    <code>containerAnimation</code> you can trigger animations when certain elements <i>inside</i> that container enter the viewport horizontally! It's like a ScrollTrigger inside of a
                    ScrollTrigger. 🤯
                </p>
            </div>
            <div class="scroll-down">
                Scroll down
                <div class="arrow"></div>
            </div>
        </div>

        <div class="container">
            <div class="panel blue">Scroll down to animate horizontally &gt;</div>

            <section class="panel red">
                <div>
                    <pre class="code-block prettyprint lang-js linenums">
gsap.to(".box-1", {
  y: -130,
  duration: 2,
  ease: "elastic",
  scrollTrigger: {
    trigger: ".box-1",
    containerAnimation: scrollTween,
    start: "left center",
    toggleActions: "play none none reset"
  }
});</pre
                    >
                    Fire an animation at a particular spot...
                </div>
                <div class="box-1 box">box-1</div>
            </section>

            <section class="panel gray">
                <div>
                    <pre class="code-block prettyprint lang-js linenums">
gsap.to(".box-2", {
  y: -120,
  backgroundColor: "#1e90ff",
  ease: "none",
  scrollTrigger: {
    trigger: ".box-2",
    containerAnimation: scrollTween,
    start: "center 80%",
    end: "center 20%",
    scrub: true
  }
});</pre
                    >
                    ...or scrub it back &amp; forth with the scrollbar
                </div>
                <div class="box-2 box">box-2</div>
            </section>
            <section class="panel purple">
                <div>
                    <pre class="code-block prettyprint lang-js linenums">
ScrollTrigger.create({
  trigger: ".box-3",
  containerAnimation: scrollTween,
  toggleClass: "active",
  start: "center 60%"
});</pre
                    >
                    Toggle a CSS class
                </div>
                <div class="box-3 box">box-3</div>
            </section>
            <section class="panel green">
                <div>
                    <pre class="code-block prettyprint lang-js linenums">
ScrollTrigger.create({
  trigger: ".green",
  containerAnimation: scrollTween,
  start: "center 65%",
  end: "center 51%",
  onEnter: () => console.log("enter"),
  onLeave: () => console.log("leave"),
  onEnterBack: () => console.log("enterBack"),
  onLeaveBack: () => console.log("leaveBack"),
  onToggle: self => console.log("active", self.isActive)
});</pre
                    >
                    Use the rich callback system
                </div>
            </section>
        </div>

        <div class="final">
            <div>
                <h1>Wasn't that fun?</h1>
                <p>Here are a few caveats to keep in mind:</p>
                <ul>
                    <li>The fake-scrolling animation (just the part that's moving the container horizontally) must have no easing (<code>ease: "none"</code>).</li>
                    <li>Pinning and snapping won't work on ScrollTriggers with a <code>containerAnimation</code>.</li>
                    <li>
                        The mapping of scroll position trigger points are based on the trigger element itself not being animated horizontally (inside the container). If you need to animate the
                        trigger, you can either wrap it in a &lt;div&gt; and use that as the trigger instead or just factor the trigger's movement into your end position. For example, if you animate
                        it left 100px, make the <code>end</code> 100px further to the left.
                    </li>
                    <li>Requires ScrollTrigger 3.8.0 or later</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style>
.panel pre.prettyprint {
    font-size: 20px;
    text-align: left;
    width: auto;
    font-weight: normal;
    margin: 10px;
    border: none;
}
.prettyprint .linenums {
    padding: 0;
    list-style: none;
}
.prettyprint ol li {
    background-color: black;
}

.panel.red .prettyprint .linenums > li:nth-child(n + 7):nth-child(-n + 9),
.panel.gray .prettyprint .linenums > li:nth-child(10),
.panel.purple .prettyprint .linenums > li:nth-child(4),
.panel.green .prettyprint .linenums > li:nth-child(n + 6):nth-child(-n + 10) {
    background-color: #222;
}

.box {
    width: 100px;
    height: 80px;
    text-align: center;
    line-height: 80px;
    background-color: white;
    border-radius: 8px;
    color: #222;
    font-weight: 700;
    margin-left: 20px;
    will-change: transform;
}
.box.active {
    background-color: orange;
    border: 2px solid white;
}
.description,
.final {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    min-height: 80vh;
}

.container {
    width: 500%;
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
}

.panel {
    font-weight: 300;
}

code {
    padding: 0.1rem;
    background: #fff;
    color: #222;
    font-size: 1.5rem;
}

h1 code {
    font-size: 1.7rem;
}
</style>
