/* eslint-disable */
import {gsap, ScrollToPlugin, MotionPathPlugin} from "gsap/all"
gsap.registerPlugin(ScrollToPlugin)
gsap.registerPlugin(MotionPathPlugin)
// try setting back to   "gsap": "^2.1.2", package to test old animations against new

// below is an unofficial ClassNamePlugin for GSAP 3. You can copy/paste it into your project. Then, just add className: to your tweens. Relative values should work fine too (add and remove classes). Typically we recommend just explicitly animating specific properties to get better performance, but some people really appreciate having a plugin like this, especially for legacy projects. Enjoy!

// ClassNamePlugin START (requires GSAP 3.2.2 or later)
gsap.registerPlugin({
    name: "className",
    init: true,
    register(gsap, Plugin) {
        var CSSPlugin = gsap.plugins.css,
            cssCore = CSSPlugin.core || console.warn("Requires GSAP 3.2.1 or later") || {},
            _removeLinkedListItem = gsap.core._removeLinkedListItem,
            _removeProperty = cssCore._removeProperty,
            PropTween = gsap.core.PropTween,
            _getAllStyles = function (target, uncache) {
                var styles = {},
                    computed = getComputedStyle(target),
                    cache = target._gsap,
                    p
                for (p in computed) {
                    if (isNaN(p) && p !== "cssText" && p !== "length") {
                        styles[p] = computed[p]
                    }
                }
                uncache && cache && (cache.uncache = true)
                gsap.getProperty(target, "x")
                cache = target._gsap
                for (p in cache) {
                    styles[p] = cache[p]
                }
                return styles
            }
        Plugin.prototype.init = function (target, endValue, tween) {
            let startClassList = target.getAttribute("class"),
                style = target.style,
                cssText = style.cssText,
                cache = target._gsap,
                classPT = cache.classPT,
                inlineToRemoveAtEnd = {},
                end =
                    endValue.charAt(1) !== "="
                        ? endValue
                        : startClassList.replace(
                              new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"),
                              "",
                          ) + (endValue.charAt(0) === "+" ? " " + endValue.substr(2) : ""),
                plugin = this,
                changingVars = {},
                startVars = _getAllStyles(target, null),
                transformRelated = /(transform|perspective)/i,
                css = new CSSPlugin(),
                _renderClassName = function (ratio) {
                    css.render(ratio, css)
                    if (!ratio || ratio === 1) {
                        target.setAttribute("class", ratio ? end : startClassList)
                        for (var p in inlineToRemoveAtEnd) {
                            _removeProperty(target, p)
                        }
                    }
                },
                endVars,
                p
            if (classPT) {
                classPT.r(1, classPT.d)
                _removeLinkedListItem(classPT.d, classPT, "_pt")
            }
            target.setAttribute("class", end)
            endVars = _getAllStyles(target, true)
            target.setAttribute("class", startClassList)
            for (p in endVars) {
                if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
                    changingVars[p] = endVars[p]
                    if (!style[p] && style[p] !== "0") {
                        inlineToRemoveAtEnd[p] = 1
                    }
                }
            }
            cache.classPT = plugin._pt = new PropTween(
                null,
                target,
                "className",
                0,
                0,
                _renderClassName,
                plugin,
                0,
                -11,
            )
            if (style.cssText !== cssText) {
                style.cssText = cssText
            }
            cache.uncache = true
            gsap.getProperty(target, "x")
            css.init(target, changingVars, tween)
            plugin._props.push.apply(plugin._props, css._props)
            return 1
        }
    },
})
// ClassNamePlugin END

// export const animFadeOutUp = (target, dur) =>
//   TweenMax.to(target, dur / 1000, {
//     ease: Power2.easeIn,
//     y: -400,
//     opacity: 0,
//   })

export const animFadeOutUp = (target, dur) =>
    gsap.to(target, {
        ease: "power2.in",
        y: -400,
        opacity: 0,
        duration: dur,
    })

// export const animFadeOutDown = (target, dur, t, r, b, l) =>
//   TweenMax.to(target, dur / 500, {
//     ease: Power3.easeOut,
//     // y: 250,
//     // opacity: 0,
//     opacity: 1,
//     position: 'absolute',
//     top: t,
//     right: r,
//     bottom: b,
//     left: l,
//   })

export const animFadeOutDown = (target, dur, t, r, b, l) =>
    gsap.to(target, {
        ease: "power3.out",
        // y: 250,
        // opacity: 0,
        opacity: 1,
        position: "absolute",
        top: t,
        right: r,
        bottom: b,
        left: l,
        duration: dur,
    })

// export const animFadeInUp = (target, dur) =>
//   TweenMax.to(target, dur / 500, {
//     ease: Power3.easeOut,
//     // y: 250,
//     // opacity: 0,
//     position: 'absolute',
//     top: 20,
//     right: 30,
//     transform: 'translate(0, 0) rotate(2deg)',
//   })

export const animFadeInUp = (target, dur) =>
    gsap.to(target, {
        ease: "elastic.out",
        // y: 250,
        // opacity: 0,
        position: "absolute",
        top: 10,
        right: 30,
        transform: "translate(0, 0) rotate(2deg)",
        duration: dur,
    })

// export const animFadeInPos = (target, dur, t, r, b, l) => {
//   return TweenMax.to(target, dur / 500, {
//     ease: Power3.easeOut,
//     // y: 250,
//     opacity: 1,
//     position: 'absolute',
//     top: t,
//     right: r,
//     bottom: b,
//     left: l,
//   })
// }

export const animFadeInPos = (target, dur, t, r, b, l, tr = "rotate(2deg)", tro = "top 0") =>
    gsap.to(target, {
        // motionPath: [
        //     {scale: 0.5, rotation: 10},
        //     {scale: 2, rotation: -10},
        //     {scale: 1, rotation: 0},
        // ],
        motionPath: [
            {scale: 2},
            // {scale: 0.5},
            {scale: 1},
        ],
        ease: "power2.out",
        // y: 250,
        opacity: 1,
        position: "absolute",
        top: t,
        right: r,
        bottom: b,
        left: l,
        duration: dur,
        transform: tr,
        transformOrigin: tro,
    })

// export const animFadeOut = (target, dur) =>
//   TweenMax.to(target, dur / 2000, {
//     ease: Power2.easeOut,
//     opacity: 0,
//   })

export const animFadeOut = (target, dur) =>
    gsap.to(target, {
        ease: "power2.out",
        opacity: 0,
        duration: dur,
    })

// export const animFadeInCard = (target, dur = 300, del) =>
//   TweenMax.to(target, dur / 1000, {
//     ease: Power2.easeOut,
//     y: -20,
//     opacity: 1,
//   }).delay(del)

export const animFadeInCard = (target, dur = 300, del) =>
    gsap.to(target, {
        ease: "power2.out",
        y: -20,
        opacity: 1,
        duration: dur,
        delay: del,
    })

// export const animFadeInSide = (target, dur = 300, del = 1, x) =>
//   TweenMax.to(target, dur / 1000, {
//     ease: Power2.easeOut,
//     x: x,
//     opacity: 1,
//   }).delay(del)

export const animFadeInSide = (target, dur = 300, del = 1, x) =>
    gsap.to(target, {
        ease: "power3.out",
        x: x,
        opacity: 1,
        duration: dur,
        delay: del,
    })

// export const animFadeInResult = (target, dur = 300, del) =>
//   TweenMax.to(target, dur / 1000, {
//     ease: Power2.easeOut,
//     x: 0,
//     opacity: 1,
//   })

export const animFadeInResult = (target, dur = 300) =>
    gsap.to(target, {
        ease: "power2.out",
        x: 0,
        opacity: 1,
        duration: dur,
    })

// export const animFadeInPage = (target, dur = 300) =>
//   TweenMax.to(target, dur / 1000, {
//     ease: Power2.easeIn,
//     opacity: 1,
//   })

export const animFadeInPage = (target, dur = 300) =>
    gsap.to(target, {
        ease: "power2.in",
        opacity: 1,
        duration: dur,
    })

// export const animToTop = (target, dur = 300) =>
//   TweenMax.to(target, dur / 1000, {
//     ease: Power4.easeOut,
//     scrollTo: { y: 0 },
//   })

export const animToTop = (target, dur = 300) =>
    gsap.to(target, {
        ease: "power4.out",
        scrollTo: {y: 0},
        duration: dur,
    })

// export const animHeight = (c, h) => {
//   if (h === 0) {
//     TweenMax.to(c, 0.5, { css: { height: 0 } })
//   } else {
//     TweenMax.to(c, 0.25, { css: { height: h } })
//   }
// }
export const animHeight = (c, h) => {
    if (h === 0) {
        gsap.to(c, {css: {height: 0}})
    } else {
        gsap.to(c, {css: {height: h}})
    }
}
// export const scrollTo = (scrollTarget, target = "home", rotation = 0, dur = 0, scaleX = 1.5, scaleY = 1.5) => {
//   let targetAdjust = { x: 2950, y: 770 }
//   targetAdjust = target === "where" ? { x: 3200, y: 1350 } : targetAdjust
//   targetAdjust = target === "why" ? { x: 2500, y: 1200 } : targetAdjust
//   targetAdjust = target === "who" ? { x: 2100, y: 500 } : targetAdjust
//   targetAdjust = target === "work" ? { x: 2100, y: 1100 } : targetAdjust
//   scrollTarget = document.getElementById(scrollTarget)
//   var roTarget = document.getElementById("massivepad")
//   target = document.getElementById(target)
//   console.log(target)
//   TweenMax.to(roTarget, 0.0000004, {
//     ease: Linear.easeNone,
//     rotation: rotation,
//     transformOrigin: "3430px 922px",
//   })

//   console.log(window.innerWidth)
//   TweenMax.to(scrollTarget, dur, {
//     ease: Power4.easeOut,
//     scaleX: scaleX,
//     scaleY: scaleY,
//     scrollTo: { y: target.offsetTop, x: target.offsetLeft - window.innerWidth / 2 },
//     // scrollTo: { y: target, x: target, offsetX: (target.clientWidth / 2) + targetAdjust.x, offsetY: (window.innerHeight / 5) + targetAdjust.y },
//   })
// }

export const scrollTo = (
    scrollTarget,
    target = "home",
    rotation = 0,
    dur = 0,
    scaleX = 1.5,
    scaleY = 1.5,
) => {
    let targetAdjust = {x: 2950, y: 770}
    targetAdjust = target === "where" ? {x: 3200, y: 1350} : targetAdjust
    targetAdjust = target === "why" ? {x: 2500, y: 1200} : targetAdjust
    targetAdjust = target === "who" ? {x: 2100, y: 500} : targetAdjust
    targetAdjust = target === "work" ? {x: 2100, y: 1100} : targetAdjust
    console.info(targetAdjust)
    scrollTarget = document.getElementById(scrollTarget)
    var roTarget = document.getElementById("massivepad")
    var newTarget = document.getElementById(target)
    console.info(newTarget)
    gsap.to(roTarget, {
        ease: "linear.none",
        rotation: rotation,
        transformOrigin: "3430px 922px",
        duration: dur,
    })

    console.info(window.innerWidth)
    gsap.to(scrollTarget, {
        ease: "power4.out",
        scaleX: scaleX,
        scaleY: scaleY,
        scrollTo: {
            y: newTarget?.offsetTop,
            x: newTarget?.offsetLeft || 0 - window.innerWidth / 2,
        },
        // scrollTo: { y: target, x: target, offsetX: (target.clientWidth / 2) + targetAdjust.x, offsetY: (window.innerHeight / 5) + targetAdjust.y },
        duration: dur,
    })
}
