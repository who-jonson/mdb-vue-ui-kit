import { computed, openBlock, createBlock, resolveDynamicComponent, normalizeClass, withCtx, renderSlot, ref, resolveDirective, withDirectives, createElementBlock, Fragment, mergeProps, createCommentVNode, onMounted, onUnmounted, watch, withKeys, renderList, createElementVNode, toDisplayString, normalizeStyle, inject, watchEffect, provide, Transition, vShow, reactive, nextTick, Teleport, createVNode, withModifiers, onBeforeUnmount, resolveComponent, KeepAlive, onUpdated, vModelRadio } from 'vue';
import { createPopper } from '@popperjs/core';

var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _sfc_main$Y = {
  name: 'MDBBadge',
  props: {
    color: String,
    pill: Boolean,
    dot: Boolean,
    notification: Boolean,
    tag: {
      type: String,
      default: 'span'
    }
  },
  setup(props, { attrs }) {
    const className = computed(() => {
      return [
        'badge',
        props.color && `bg-${props.color}`,
        props.pill && 'rounded-pill',
        props.dot && 'badge-dot',
        props.notification && 'badge-notification'
      ]
    });

    return {
      className,
      attrs,
      props
    }
  }
};

function _sfc_render$Y(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]))
}
var MDBBadge = /*#__PURE__*/_export_sfc(_sfc_main$Y, [['render',_sfc_render$Y]]);

const bsColors = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'light',
  'dark'
];
const gradient
  = 'rgba({{color}}, 0.2) 0, rgba({{color}}, 0.3) 40%, rgba({{color}}, 0.4) 50%, rgba({{color}}, 0.5) 60%, rgba({{color}}, 0) 70%';
const defaultColor = [0, 0, 0];
const transitionBreakOpacity = 0.5;

const isBSColor = propColor => bsColors.includes(propColor.toLowerCase());

const colorToRGB = (color, defaultColor) => {
  const hexToRgb = (color) => {
    const HEX_COLOR_LENGTH = 7;
    const IS_SHORT_HEX = color.length < HEX_COLOR_LENGTH;
    if (IS_SHORT_HEX)
      color = `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;

    return [
      parseInt(color.substr(1, 2), 16),
      parseInt(color.substr(3, 2), 16),
      parseInt(color.substr(5, 2), 16)
    ]
  };

  const namedColorsToRgba = (color) => {
    const tempElem = document.body.appendChild(
      document.createElement('fictum')
    );
    const flag = 'rgb(1, 2, 3)';
    tempElem.style.color = flag;

    if (tempElem.style.color !== flag)
      return defaultColor

    tempElem.style.color = color;

    if (tempElem.style.color === flag || tempElem.style.color === '')
      return defaultColor

    color = getComputedStyle(tempElem).color;
    document.body.removeChild(tempElem);

    return color
  };

  const rgbaToRgb = (color) => {
    color = color.match(/[.\d]+/g).map(a => +Number(a));
    color.length = 3;
    return color
  };

  if (color.toLowerCase() === 'transparent')
    return defaultColor

  if (color[0] === '#')
    return hexToRgb(color)

  if (!color.includes('rgb'))
    color = namedColorsToRgba(color);

  if (color.indexOf('rgb') === 0)
    return rgbaToRgb(color)

  return defaultColor
};

const getDiameter = ({ offsetX, offsetY, height, width }) => {
  const top = offsetY <= height / 2;
  const left = offsetX <= width / 2;
  const pythagorean = (sideA, sideB) => Math.sqrt(sideA ** 2 + sideB ** 2);

  const positionCenter = offsetY === height / 2 && offsetX === width / 2;
  const quadrant = {
    first: top === true && left === false,
    second: top === true && left === true,
    third: top === false && left === true,
    fourth: top === false && left === false
  };

  const getCorner = {
    topLeft: pythagorean(offsetX, offsetY),
    topRight: pythagorean(width - offsetX, offsetY),
    bottomLeft: pythagorean(offsetX, height - offsetY),
    bottomRight: pythagorean(width - offsetX, height - offsetY)
  };

  let diameter = 0;

  if (positionCenter || quadrant.fourth)
    diameter = getCorner.topLeft;
  else if (quadrant.third)
    diameter = getCorner.topRight;
  else if (quadrant.second)
    diameter = getCorner.bottomRight;
  else if (quadrant.first)
    diameter = getCorner.bottomLeft;

  return diameter * 2
};

const setStyles = (el, styles) => {
  for (const property in styles)
    el.style[property] = styles[property];
};

const getBackgroundImage = (color) => {
  if (color !== '') {
    const rgbValue = colorToRGB(color, defaultColor).join(',');
    const gradientImage = gradient.split('{{color}}').join(`${rgbValue}`);
    return `radial-gradient(circle, ${gradientImage})`
  }
};

const runRipple = (el, waveConfig, options) => {
  const rippleElement = document.createElement('div');
  rippleElement.classList.add('ripple-wave');

  const diameterConfig = {
    offsetX: options.centered ? waveConfig.height / 2 : waveConfig.left,
    offsetY: options.centered ? waveConfig.width / 2 : waveConfig.top,
    height: waveConfig.height,
    width: waveConfig.width
  };
  const diameter = getDiameter(diameterConfig);
  const radiusValue = options.radius || diameter / 2;
  const opacity = {
    delay: options.duration * transitionBreakOpacity,
    duration: options.duration - options.duration * transitionBreakOpacity
  };

  const styles = {
    left: options.centered
      ? `${Math.round(waveConfig.width / 2 - radiusValue)}px`
      : `${Math.round(waveConfig.left - radiusValue)}px`,
    top: options.centered
      ? `${Math.round(waveConfig.height / 2 - radiusValue)}px`
      : `${Math.round(waveConfig.top - radiusValue)}px`,
    height: `${Math.round(options.radius * 2 || diameter)}px`,
    width: `${Math.round(options.radius * 2 || diameter)}px`,
    transitionDelay: `0s, ${opacity.delay}ms`,
    transitionDuration: `${options.duration}ms, ${opacity.duration}ms`
  };

  if (options.unbound)
    el.classList.add('ripple-surface-unbound');

  if (isBSColor(options.color))
    el.classList.add(`ripple-surface-${options.color}`);
  else
    styles.backgroundImage = getBackgroundImage(options.color);

  setStyles(rippleElement, styles);
  el.appendChild(rippleElement);

  setTimeout(() => {
    rippleElement.classList.add('active');
  }, 50);

  setTimeout(() => {
    el.removeChild(rippleElement);
  }, options.duration + 1000);
};

var mdbRipple = {
  mounted(el, binding) {
    if (binding.value === false)
      return

    const options = {
      centered: (binding.value && binding.value.centered) || false,
      color: (binding.value && binding.value.color) || '',
      duration: (binding.value && binding.value.duration) || 500,
      radius: (binding.value && binding.value.radius) || 0,
      unbound: (binding.value && binding.value.unbound) || false
    };

    el.classList.add('ripple-surface');
    el.waves = (e) => {
      const waveConfig = {
        top: e.layerY,
        left: e.layerX,
        height: el.offsetHeight,
        width: el.offsetWidth
      };
      runRipple(el, waveConfig, options);
    };

    el.addEventListener('click', el.waves);
  },

  updated(el) {
    if (!el.classList.contains('ripple-surface'))
      el.classList.add('ripple-surface');
  },

  unmounted(el) {
    el.removeEventListener('click', el.waves);
  }
};

const _sfc_main$X = {
  name: 'MDBBtn',
  directives: { mdbRipple },
  props: {
    color: String,
    size: String,
    outline: String,
    rounded: Boolean,
    floating: Boolean,
    toggler: Boolean,
    toggle: Boolean,
    role: {
      type: String,
      default: 'button'
    },
    type: {
      type: String,
      default: 'button'
    },
    tag: {
      type: String,
      default: 'button'
    },
    block: {
      type: Boolean,
      default: false
    },
    ripple: {
      type: [Object, Boolean],
      default: props =>
        props.outline || props.color === 'light' || props.color === 'link'
          ? { color: 'dark' }
          : true
    },
    picker: Boolean
  },
  emits: ['update:toggle'],
  setup(props, { emit }) {
    const toggle = ref(props.toggle);

    const className = computed(() => {
      return [
        !props.picker && 'btn',
        props.color && `btn-${props.color}`,
        props.size && `btn-${props.size}`,
        props.outline && `btn-outline-${props.outline}`,
        props.rounded && 'btn-rounded',
        props.floating && 'btn-floating',
        props.block && 'btn-block',
        toggle.value && 'active'
      ]
    });

    function handleClick() {
      if (props.toggler) {
        toggle.value = !toggle.value;
        emit('update:toggle', toggle.value);
      }
    }

    return {
      className,
      props,
      handleClick
    }
  }
};

function _sfc_render$X(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_mdb_ripple = resolveDirective("mdb-ripple");

  return withDirectives((openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    type: $props.type,
    role: $props.role,
    class: normalizeClass($setup.className),
    onClick: $setup.handleClick
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["type", "role", "class", "onClick"])), [
    [_directive_mdb_ripple, $props.ripple]
  ])
}
var MDBBtn = /*#__PURE__*/_export_sfc(_sfc_main$X, [['render',_sfc_render$X]]);

const _sfc_main$W = {
  name: 'MDBBtnGroup',
  props: {
    size: String,
    vertical: Boolean,
    role: {
      type: String,
      default: 'group'
    },
    tag: {
      type: String,
      default: 'div'
    }
  },
  setup(props) {
    const className = computed(() => {
      return [
        props.size && `btn-group-${props.size}`,
        props.vertical ? 'btn-group-vertical' : 'btn-group'
      ]
    });

    return {
      className,
      props
    }
  }
};

function _sfc_render$W(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className),
    role: $props.role
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class", "role"]))
}
var MDBBtnGroup = /*#__PURE__*/_export_sfc(_sfc_main$W, [['render',_sfc_render$W]]);

const _sfc_main$V = {
  name: 'MDBBtnClose',
  props: {
    white: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const className = computed(() => {
      return ['btn-close', props.white && 'btn-close-white']
    });

    return {
      className
    }
  }
};

function _sfc_render$V(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("button", {
    class: normalizeClass($setup.className),
    "aria-label": "Close"
  }, null, 2))
}
var MDBBtnClose = /*#__PURE__*/_export_sfc(_sfc_main$V, [['render',_sfc_render$V]]);

const _sfc_main$U = {
  name: 'MDBCard',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    border: {
      type: String
    },
    bg: {
      type: String
    },
    text: {
      type: [String, Array]
    },
    shadow: {
      type: String
    }
  },
  setup(props) {
    const className = computed(() => {
      return [
        'card',
        props.border && `border border-${props.border}`,
        props.bg && `bg-${props.bg}`,
        props.shadow && `shadow-${props.shadow}`,
        props.text && spreadProps(props.text)
      ]
    });

    const spreadProps = (props) => {
      if (typeof props === 'string')
        return `text-${props}`

      return props.map(prop => `text-${prop}`.trim()).join(' ')
    };

    return {
      className,
      props
    }
  }
};

function _sfc_render$U(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]))
}
var MDBCard = /*#__PURE__*/_export_sfc(_sfc_main$U, [['render',_sfc_render$U]]);

const _sfc_main$T = {
  name: 'MDBCardBody',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    text: {
      type: [String, Array]
    }
  },
  setup(props) {
    const className = computed(() => {
      return ['card-body', props.text && spreadProps(props.text)]
    });

    const spreadProps = (props) => {
      if (typeof props === 'string')
        return `text-${props}`

      return props.map(prop => `text-${prop}`.trim()).join(' ')
    };

    return {
      className,
      props
    }
  }
};

function _sfc_render$T(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]))
}
var MDBCardBody = /*#__PURE__*/_export_sfc(_sfc_main$T, [['render',_sfc_render$T]]);

const _sfc_main$S = {
  name: 'MDBCardTitle',
  props: {
    tag: {
      type: String,
      default: 'h5'
    },
    subtitle: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const tagName = computed(() => {
      if (!props.subtitle)
        return props.tag

      return props.tag !== 'h5' ? props.tag : 'h6'
    });

    const className = computed(() => {
      return [props.subtitle ? 'card-subtitle' : 'card-title']
    });

    return {
      className,
      tagName,
      props
    }
  }
};

function _sfc_render$S(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($setup.tagName), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]))
}
var MDBCardTitle = /*#__PURE__*/_export_sfc(_sfc_main$S, [['render',_sfc_render$S]]);

const _sfc_main$R = {
  name: 'MDBCardText',
  props: {
    tag: {
      type: String,
      default: 'p'
    }
  },
  setup(props) {
    const className = computed(() => {
      return ['card-text']
    });

    return {
      className,
      props
    }
  }
};

function _sfc_render$R(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]))
}
var MDBCardText = /*#__PURE__*/_export_sfc(_sfc_main$R, [['render',_sfc_render$R]]);

const _sfc_main$Q = {
  name: 'MDBCardImg',
  props: {
    tag: {
      type: String,
      default: 'img'
    },
    src: {
      type: String,
      required: true
    },
    alt: String,
    top: {
      type: Boolean,
      default: false
    },
    bottom: {
      type: Boolean,
      default: false
    },
    fluid: {
      type: Boolean,
      default: false
    },
    overlay: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const className = computed(() => {
      return [
        props.top && 'card-img-top',
        props.bottom && 'card-img-bottom',
        props.fluid && 'img-fluid',
        props.overlay && 'card-img',
        !props.top
          && !props.bottom
          && !props.fluid
          && !props.overlay
          && 'card-img'
      ]
    });

    return {
      className,
      props
    }
  }
};

function _sfc_render$Q(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock(Fragment, null, [
    (openBlock(), createBlock(resolveDynamicComponent($props.tag), mergeProps({
      src: $props.src,
      alt: $props.alt,
      class: $setup.className
    }, _ctx.$attrs), null, 16, ["src", "alt", "class"])),
    ($props.overlay)
      ? (openBlock(), createElementBlock("div", mergeProps({
          key: 0,
          class: "card-img-overlay"
        }, _ctx.$attrs), [
          renderSlot(_ctx.$slots, "default")
        ], 16))
      : createCommentVNode("", true)
  ], 64))
}
var MDBCardImg = /*#__PURE__*/_export_sfc(_sfc_main$Q, [['render',_sfc_render$Q]]);

const _sfc_main$P = {
  name: 'MDBCardHeader',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    bg: String,
    border: String
  },
  setup(props) {
    const className = computed(() => {
      return [
        'card-header',
        props.border && `border-${props.border}`,
        props.bg && `bg-${props.bg}`
      ]
    });

    return {
      className,
      props
    }
  }
};

function _sfc_render$P(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]))
}
var MDBCardHeader = /*#__PURE__*/_export_sfc(_sfc_main$P, [['render',_sfc_render$P]]);

const _sfc_main$O = {
  name: 'MDBCardFooter',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    bg: String,
    border: String
  },
  setup(props) {
    const className = computed(() => {
      return [
        'card-footer',
        props.border && `border-${props.border}`,
        props.bg && `bg-${props.bg}`
      ]
    });

    return {
      className,
      props
    }
  }
};

function _sfc_render$O(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]))
}
var MDBCardFooter = /*#__PURE__*/_export_sfc(_sfc_main$O, [['render',_sfc_render$O]]);

const _sfc_main$N = {
  name: 'MDBCardLink',
  props: {
    tag: {
      type: String,
      default: 'a'
    }
  },
  setup(props) {
    const className = computed(() => {
      return ['card-link']
    });

    return {
      className,
      props
    }
  }
};

function _sfc_render$N(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]))
}
var MDBCardLink = /*#__PURE__*/_export_sfc(_sfc_main$N, [['render',_sfc_render$N]]);

const _sfc_main$M = {
  name: 'MDBCardGroup',
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },
  setup(props) {
    const className = computed(() => {
      return ['card-group']
    });

    return {
      className,
      props
    }
  }
};

function _sfc_render$M(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]))
}
var MDBCardGroup = /*#__PURE__*/_export_sfc(_sfc_main$M, [['render',_sfc_render$M]]);

const _sfc_main$L = {
  name: 'MDBCarousel',
  props: {
    captionsClass: {
      type: String,
      default: 'carousel-caption d-none d-md-block'
    },
    controls: {
      type: Boolean,
      default: true
    },
    dark: Boolean,
    fade: Boolean,
    indicators: {
      type: Boolean,
      default: true
    },
    interval: {
      type: [Number, Boolean],
      default: 5000
    },
    items: {
      type: Array,
      reguired: true
    },
    itemsClass: {
      type: String,
      default: 'd-block w-100'
    },
    keyboard: {
      type: Boolean,
      default: true
    },
    modelValue: {
      type: Number,
      default: 0
    },
    pause: {
      type: [String, Boolean],
      default: 'hover'
    },
    tag: {
      type: String,
      default: 'div'
    },
    touch: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const className = computed(() => {
      return [
        'carousel',
        'slide',
        props.fade && 'carousel-fade',
        props.dark && 'carousel-dark'
      ]
    });

    const activeItemKey = ref(props.modelValue);
    const carouselInnerRef = ref(null);
    const isSliding = ref(false);

    let slidingInterval = null;
    let isPaused = false;

    const prev = () => {
      slideTo('prev');
    };
    const next = () => {
      slideTo('next');
    };
    const slideTo = (target) => {
      if (isSliding.value)
        return

      const isPausedState = isPaused;
      isPaused = false;

      slide(target);

      isPaused = isPausedState;
    };

    const slide = (target) => {
      if (isPaused || !carouselInnerRef.value)
        return

      isSliding.value = true;
      const targetItemKey = getTargetKey(target);
      const isNext = getTargetSlideOrder(target);
      const directionalClassName = getDirectionalClassName(isNext);
      const orderClassName = getOrderClassName(isNext);
      const currentItem = getItem(activeItemKey.value);
      const targetItem = getItem(targetItemKey);

      activeItemKey.value = targetItemKey;
      targetItem.classList.add(orderClassName);
      emit('update:modelValue', activeItemKey.value);

      if (props.interval)
        reloadInterval();

      setTimeout(() => {
        currentItem.classList.add(directionalClassName);
        targetItem.classList.add(directionalClassName);
      }, 20);

      setTimeout(() => {
        currentItem.classList.remove('active');
        currentItem.classList.remove(directionalClassName);
        targetItem.classList.remove(directionalClassName);
        targetItem.classList.remove(orderClassName);
        targetItem.classList.add('active');
        isSliding.value = false;
      }, 600);
    };

    const getTargetKey = (target) => {
      if (target === 'prev' && activeItemKey.value <= 0)
        return props.items.length - 1
      else if (target === 'prev')
        return activeItemKey.value - 1
      else if (
        target === 'next'
        && activeItemKey.value >= props.items.length - 1
      )
        return 0
      else if (target === 'next')
        return activeItemKey.value + 1
      else
        return target
    };
    const getTargetSlideOrder = (target) => {
      if (target === 'next' || target > activeItemKey.value)
        return true
      else
        return false
    };
    const getDirectionalClassName = isNext =>
      isNext ? 'carousel-item-start' : 'carousel-item-end';
    const getOrderClassName = isNext =>
      isNext ? 'carousel-item-next' : 'carousel-item-prev';
    const getItem = key =>
      carouselInnerRef.value.querySelectorAll('.carousel-item')[key];

    const reloadInterval = () => {
      clearInterval(slidingInterval);
      slidingInterval = null;

      const itemInterval
        = props.items[activeItemKey.value].interval || props.interval;
      slidingInterval = setInterval(() => {
        slide('next');
      }, itemInterval);
    };

    // keyboard accessibility
    const handleMouseenter = () => {
      if (props.pause === 'hover' && props.interval) {
        clearInterval(slidingInterval);
        slidingInterval = null;
        isPaused = true;
      }
    };
    const handleMouseleave = () => {
      if (props.pause === 'hover' && props.interval) {
        reloadInterval();
        isPaused = false;
      }
    };
    const handleRight = () => {
      if (props.keyboard)
        next();
    };
    const handleLeft = () => {
      if (props.keyboard)
        prev();
    };

    // touch events
    const pointerEvent = ref(false);
    const touchStartX = ref(0);
    const touchDeltaX = ref(0);
    const handleTouchstart = (event) => {
      if (!props.touch)
        return

      if (
        pointerEvent.value
        && (event.pointerType === 'pen' || event.pointerType === 'touch')
      )
        touchStartX.value = event.clientX;
      else
        touchStartX.value = event.touches[0].clientX;
    };
    const handleTouchmove = (event) => {
      if (!props.touch)
        return

      touchDeltaX.value
        = event.touches && event.touches.length > 1
          ? 0
          : event.touches[0].clientX - touchStartX.value;
    };
    const handleTouchend = (event) => {
      if (!props.touch)
        return

      if (
        pointerEvent.value
        && (event.pointerType === 'pen' || event.pointerType === 'touch')
      )
        touchDeltaX.value = event.clientX - touchStartX.value;

      handleSwipe();
    };
    const handleSwipe = () => {
      const absDeltax = Math.abs(touchDeltaX.value);

      if (absDeltax <= 40)
        return

      const direction = absDeltax / touchDeltaX.value;
      touchDeltaX.value = 0;

      if (!direction)
        return

      if (direction > 0)
        prev();
      else
        next();
    };

    onMounted(() => {
      pointerEvent.value = Boolean(window.PointerEvent);
      const currentActiveItem
        = carouselInnerRef.value.querySelectorAll('.carousel-item')[
          activeItemKey.value
        ];
      currentActiveItem.classList.add('active');

      if (props.interval)
        reloadInterval();
    });

    onUnmounted(() => {
      if (props.interval) {
        clearInterval(slidingInterval);
        slidingInterval = null;
      }
    });

    watch(
      () => props.modelValue,
      targetItemKey => slideTo(targetItemKey)
    );

    return {
      className,
      carouselInnerRef,
      activeItemKey,
      handleMouseenter,
      handleMouseleave,
      handleRight,
      handleLeft,
      handleTouchstart,
      handleTouchmove,
      handleTouchend,
      slideTo,
      next,
      prev
    }
  }
};

const _hoisted_1$h = {
  key: 0,
  class: "carousel-indicators"
};
const _hoisted_2$c = ["aria-current", "aria-label", "onClick"];
const _hoisted_3$8 = {
  ref: "carouselInnerRef",
  class: "carousel-inner"
};
const _hoisted_4$5 = ["src", "alt"];
const _hoisted_5$3 = { key: 0 };
const _hoisted_6$3 = { key: 1 };
const _hoisted_7$2 = /*#__PURE__*/createElementVNode("span", {
  class: "carousel-control-prev-icon",
  "aria-hidden": "true"
}, null, -1);
const _hoisted_8$2 = /*#__PURE__*/createElementVNode("span", { class: "visually-hidden" }, "Previous", -1);
const _hoisted_9$2 = [
  _hoisted_7$2,
  _hoisted_8$2
];
const _hoisted_10$2 = /*#__PURE__*/createElementVNode("span", {
  class: "carousel-control-next-icon",
  "aria-hidden": "true"
}, null, -1);
const _hoisted_11$2 = /*#__PURE__*/createElementVNode("span", { class: "visually-hidden" }, "Next", -1);
const _hoisted_12$2 = [
  _hoisted_10$2,
  _hoisted_11$2
];

function _sfc_render$L(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className),
    onMouseenter: $setup.handleMouseenter,
    onMouseleave: $setup.handleMouseleave,
    onKeydown: [
      withKeys($setup.handleRight, ["right"]),
      withKeys($setup.handleLeft, ["left"])
    ],
    onTouchstart: $setup.handleTouchstart,
    onTouchmove: $setup.handleTouchmove,
    onTouchend: $setup.handleTouchend
  }, {
    default: withCtx(() => [
      ($props.indicators)
        ? (openBlock(), createElementBlock("div", _hoisted_1$h, [
            (openBlock(true), createElementBlock(Fragment, null, renderList($props.items, (item, key) => {
              return (openBlock(), createElementBlock("button", {
                key: key,
                type: "button",
                class: normalizeClass($setup.activeItemKey === key && 'active'),
                "aria-current": $setup.activeItemKey === key && 'true',
                "aria-label": `Slide ${key + 1}`,
                onClick: $event => ($setup.slideTo(key))
              }, null, 10, _hoisted_2$c))
            }), 128))
          ]))
        : createCommentVNode("", true),
      createElementVNode("div", _hoisted_3$8, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($props.items, (item, key) => {
          return (openBlock(), createElementBlock("div", {
            key: key,
            class: "carousel-item"
          }, [
            createElementVNode("img", {
              src: item.src,
              alt: item.alt,
              class: normalizeClass($props.itemsClass)
            }, null, 10, _hoisted_4$5),
            (item.label || item.caption)
              ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: normalizeClass($props.captionsClass)
                }, [
                  (item.label)
                    ? (openBlock(), createElementBlock("h5", _hoisted_5$3, toDisplayString(item.label), 1))
                    : createCommentVNode("", true),
                  (item.caption)
                    ? (openBlock(), createElementBlock("p", _hoisted_6$3, toDisplayString(item.caption), 1))
                    : createCommentVNode("", true)
                ], 2))
              : createCommentVNode("", true)
          ]))
        }), 128))
      ], 512),
      ($props.controls)
        ? (openBlock(), createElementBlock("button", {
            key: 1,
            class: "carousel-control-prev",
            type: "button",
            onClick: _cache[0] || (_cache[0] = (...args) => ($setup.prev && $setup.prev(...args)))
          }, _hoisted_9$2))
        : createCommentVNode("", true),
      ($props.controls)
        ? (openBlock(), createElementBlock("button", {
            key: 2,
            class: "carousel-control-next",
            type: "button",
            onClick: _cache[1] || (_cache[1] = (...args) => ($setup.next && $setup.next(...args)))
          }, _hoisted_12$2))
        : createCommentVNode("", true)
    ]),
    _: 1
  }, 8, ["class", "onMouseenter", "onMouseleave", "onKeydown", "onTouchstart", "onTouchmove", "onTouchend"]))
}
var MDBCarousel = /*#__PURE__*/_export_sfc(_sfc_main$L, [['render',_sfc_render$L]]);

const _sfc_main$K = {
  name: 'MDBListGroup',
  props: {
    flush: {
      type: Boolean,
      default: false
    },
    horizontal: {
      type: [Boolean, String],
      default: false
    },
    numbered: Boolean,
    tag: {
      type: String,
      default: 'ul'
    }
  },
  setup(props) {
    const className = computed(() => {
      return [
        'list-group',
        props.horizontal && horizontalClass.value,
        props.flush && 'list-group-flush',
        props.numbered && 'list-group-numbered'
      ]
    });

    const horizontalClass = computed(() => {
      if (!props.horizontal)
        return

      return props.horizontal !== true
        ? `list-group-horizontal-${props.horizontal}`
        : 'list-group-horizontal'
    });

    return {
      className,
      props
    }
  }
};

function _sfc_render$K(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]))
}
var MDBListGroup = /*#__PURE__*/_export_sfc(_sfc_main$K, [['render',_sfc_render$K]]);

const _sfc_main$J = {
  name: 'MDBListGroupItem',
  props: {
    tag: {
      type: String,
      default: 'li'
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    action: {
      type: Boolean,
      default: false
    },
    color: String
  },
  setup(props) {
    const className = computed(() => {
      return [
        'list-group-item',
        props.active && 'active',
        props.disabled && 'disabled',
        props.action && 'list-group-item-action',
        props.color && `list-group-item-${props.color}`
      ]
    });

    return {
      className,
      props
    }
  }
};

function _sfc_render$J(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className),
    "aria-current": $props.active ? true : null,
    "aria-disabled": $props.disabled ? true : null,
    disabled: $props.disabled ? true : null
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class", "aria-current", "aria-disabled", "disabled"]))
}
var MDBListGroupItem = /*#__PURE__*/_export_sfc(_sfc_main$J, [['render',_sfc_render$J]]);

const _sfc_main$I = {
  name: 'MDBProgress',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    height: Number
  },
  setup(props) {
    const className = computed(() => {
      return ['progress']
    });
    const style = computed(() => {
      return { height: `${props.height}px` }
    });

    return {
      className,
      style,
      props
    }
  }
};

function _sfc_render$I(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className),
    style: normalizeStyle($setup.style)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class", "style"]))
}
var MDBProgress = /*#__PURE__*/_export_sfc(_sfc_main$I, [['render',_sfc_render$I]]);

const _sfc_main$H = {
  name: 'MDBProgressBar',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    bg: String,
    striped: {
      type: Boolean,
      default: false
    },
    animated: {
      type: Boolean,
      default: false
    },
    value: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    }
  },
  setup(props) {
    const className = computed(() => {
      return [
        'progress-bar',
        props.bg && `bg-${props.bg}`,
        props.striped && 'progress-bar-striped',
        props.animated && 'progress-bar-animated'
      ]
    });

    return {
      className,
      props
    }
  }
};

function _sfc_render$H(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className),
    role: "progressbar",
    "aria-valuenow": $props.value,
    "aria-valuemin": $props.min,
    "aria-valuemax": $props.max,
    style: normalizeStyle([
      {
        width: (($props.value - $props.min) / ($props.max - $props.min)) * 100 + '%',
      },
    ])
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class", "aria-valuenow", "aria-valuemin", "aria-valuemax", "style"]))
}
var MDBProgressBar = /*#__PURE__*/_export_sfc(_sfc_main$H, [['render',_sfc_render$H]]);

const _sfc_main$G = {
  name: 'MDBSpinner',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    grow: {
      type: Boolean,
      default: false
    },
    color: String,
    size: String
  },
  setup(props) {
    const className = computed(() => {
      return [
        props.grow ? 'spinner-grow' : 'spinner-border',
        props.color && `text-${props.color}`,
        `${
          props.size
            ? props.grow
              ? `spinner-grow-${props.size}`
              : `spinner-border-${props.size}`
            : ''
        }`
      ]
    });

    return {
      className,
      props
    }
  }
};

const _hoisted_1$g = /*#__PURE__*/createElementVNode("span", { class: "visually-hidden" }, "Loading...", -1);

function _sfc_render$G(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className),
    role: "status"
  }, {
    default: withCtx(() => [
      _hoisted_1$g,
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]))
}
var MDBSpinner = /*#__PURE__*/_export_sfc(_sfc_main$G, [['render',_sfc_render$G]]);

const MAX_UID = 1000000;

const getUID = (prefix) => {
  do
    prefix += Math.floor(Math.random() * MAX_UID);
  while (document.getElementById(prefix))

  return prefix
};

const stripNameRegex = /\..*/;
const customEvents = {
  mouseenter: 'mouseover',
  mouseleave: 'mouseout'
};
const nativeEvents = [
  'click',
  'dblclick',
  'mouseup',
  'mousedown',
  'contextmenu',
  'mousewheel',
  'DOMMouseScroll',
  'mouseover',
  'mouseout',
  'mousemove',
  'selectstart',
  'selectend',
  'keydown',
  'keypress',
  'keyup',
  'orientationchange',
  'touchstart',
  'touchmove',
  'touchend',
  'touchcancel',
  'pointerdown',
  'pointermove',
  'pointerup',
  'pointerleave',
  'pointercancel',
  'gesturestart',
  'gesturechange',
  'gestureend',
  'focus',
  'blur',
  'change',
  'reset',
  'select',
  'submit',
  'focusin',
  'focusout',
  'load',
  'unload',
  'beforeunload',
  'resize',
  'move',
  'DOMContentLoaded',
  'readystatechange',
  'error',
  'abort',
  'scroll'
];

function normalizeParams(originalTypeEvent, handler, delegationFn) {
  const delegation = typeof handler === 'string';
  const originalHandler = delegation ? delegationFn : handler;

  // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
  let typeEvent = originalTypeEvent.replace(stripNameRegex, '');
  const custom = customEvents[typeEvent];

  if (custom)
    typeEvent = custom;

  const isNative = nativeEvents.includes(typeEvent);

  if (!isNative)
    typeEvent = originalTypeEvent;

  return [delegation, originalHandler, typeEvent]
}

function addHandler(element, originalTypeEvent, handler, delegationFn) {
  if (typeof originalTypeEvent !== 'string' || !element)
    return

  if (!handler) {
    handler = delegationFn;
    delegationFn = null;
  }

  const [delegation, originalHandler, typeEvent] = normalizeParams(
    originalTypeEvent,
    handler,
    delegationFn
  );
  element.addEventListener(typeEvent, originalHandler, delegation);
}

function removeHandler(element, typeEvent, handler, delegationSelector) {
  element.removeEventListener(typeEvent, handler, !!delegationSelector);
}

const on = function(element, event, handler, delegationFn) {
  addHandler(element, event, handler, delegationFn);
};

const off = function(element, event, handler, delegationFn) {
  if (typeof event !== 'string' || !element)
    return

  const [delegation, originalHandler, typeEvent] = normalizeParams(
    event,
    handler,
    delegationFn
  );

  removeHandler(
    element,
    typeEvent,
    originalHandler,
    delegation ? handler : null
  );
};

const _sfc_main$F = {
  name: 'MDBCollapse',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    modelValue: Boolean,
    id: String,
    collapseClass: String,
    duration: {
      type: Number,
      default: 300
    },
    sidenav: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const collapse = ref(null);

    const className = computed(() => {
      return [
        collapseClass.value,
        props.collapseClass,
        navbarFlexWrapValue.value ? 'navbar-collapse' : '',
        showClass.value
      ]
    });

    const collapseClass = computed(() => {
      return props.sidenav
        ? 'sidenav-collapse'
        : isActive.value
          ? 'collapse'
          : null
    });

    const accordionState = inject('accordionState', null);
    const incrementAccordionItemsCount = inject(
      'incrementAccordionItemsCount',
      false
    );
    const setAccordionActiveItem = inject('setAccordionActiveItem', false);
    const index = ref(null);

    const manageAccordion = () => {
      if (index.value !== null && isActive.value)
        setAccordionActiveItem(index.value);
    };

    watchEffect(
      () => {
        if (accordionState) {
          if (accordionState.active !== index.value)
            emit('update:modelValue', false);
        }
      },
      { flush: 'post' }
    );

    onMounted(() => {
      if (isActive.value)
        collapse.value.style.height = `${collapse.value.scrollHeight}px`;

      if (accordionState) {
        index.value = incrementAccordionItemsCount();

        if (isActive.value)
          setAccordionActiveItem(index.value);
      }
    });

    const isActive = ref(props.modelValue);
    watchEffect(() => {
      isActive.value = props.modelValue;
      if (accordionState)
        manageAccordion();
    });

    const openCollapse = () => {
      emit('update:modelValue', true);
    };

    provide('openCollapse', openCollapse);

    const navbarFlexWrapValue = inject('navbarFlexWrapValue', false);

    const showClass = computed(() => {
      if (
        !navbarFlexWrapValue
        || (navbarFlexWrapValue.value === 'wrap' && isActive.value)
      )
        return 'show'
      else if (navbarFlexWrapValue === 'nowrap' && isActive.value)
        return false

      return false
    });

    const checkWrapCollapseValue = (cur, prev) => {
      if (prev === 'null' && props.modelValue) {
        // open on first render when collapsed props
        isActive.value = true;
      }
      else if (prev === 'null' && !props.modelValue) {
        // close on first render when no collapsed props
        isActive.value = false;
      }
      else if (prev === 'nowrap') {
        // always close when resizing down from full navbar
        isActive.value = false;
      }
    };

    watch(
      () => navbarFlexWrapValue.value,
      (cur, prev) => {
        if (cur === 'nowrap')
          isActive.value = true;
        else if (cur === 'wrap')
          checkWrapCollapseValue(cur, prev);

        emit('update:modelValue', isActive.value);
      },
      { immediate: true }
    );

    const uid = computed(() => {
      return props.id ? props.id : getUID('collapsibleContent-')
    });

    const beforeEnter = (el) => {
      el.style.height = '0';
    };
    const enter = (el) => {
      el.style.height = `${getContentHeight()}px`;
    };

    const afterEnter = (el) => {
      if (!el.classList.contains('show'))
        el.classList.add('show');
    };

    const beforeLeave = (el) => {
      if (!el.style.height)
        el.style.height = `${el.offsetHeight}px`;
    };
    const leave = (el) => {
      el.style.height = '0';
    };

    const afterLeave = (el) => {
      el.classList.add('collapse');
    };

    const previousWindowWidth = ref(null);
    const isThrottled = ref(false);

    const getContentHeight = () => {
      const contentNodes = [
        ...document.getElementById(uid.value).childNodes
      ].filter(el => el.textContent.trim() != '');
      return contentNodes.reduce((acc, cur) => {
        return acc + nodeOuterHeight(cur)
      }, 0)
    };

    const nodeOuterHeight = (node) => {
      const height = node.offsetHeight;

      if (!height) {
        // if there is no height it means this node is an inline node without any tag, eg: text node
        if (document.createRange) {
          const range = document.createRange();
          range.selectNodeContents(node);
          if (range.getBoundingClientRect) {
            const rect = range.getBoundingClientRect();
            if (rect)
              return rect.bottom - rect.top
          }
        }
        return
      }

      const style = window.getComputedStyle(node);

      return ['top', 'bottom']
        .map(side => parseInt(style[`margin-${side}`]))
        .reduce((accHeight, margin) => accHeight + margin, height)
    };

    const handleResize = () => {
      if (!isActive.value || isThrottled.value) return

      isThrottled.value = true;

      const windowWidth = window.innerWidth;
      const contentHeight = getContentHeight();

      collapse.value.style.height = `${contentHeight}px`;

      previousWindowWidth.value = windowWidth;
      setTimeout(() => {
        isThrottled.value = false;
      }, 100);
    };

    onMounted(() => {
      previousWindowWidth.value = window.innerWidth;
      on(window, 'resize', handleResize);
    });

    onUnmounted(() => {
      off(window, 'resize', handleResize);
    });

    return {
      collapse,
      className,
      isActive,
      uid,
      beforeEnter,
      enter,
      afterEnter,
      beforeLeave,
      leave,
      afterLeave,
      props
    }
  }
};

function _sfc_render$F(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(Transition, {
    "enter-active-class": "collapsing",
    "leave-active-class": "collapsing show",
    duration: $props.duration,
    onBeforeEnter: $setup.beforeEnter,
    onEnter: $setup.enter,
    onAfterEnter: $setup.afterEnter,
    onBeforeLeave: $setup.beforeLeave,
    onLeave: $setup.leave,
    onAfterLeave: $setup.afterLeave
  }, {
    default: withCtx(() => [
      withDirectives((openBlock(), createBlock(resolveDynamicComponent($props.tag), {
        id: $setup.uid,
        ref: "collapse",
        class: normalizeClass($setup.className)
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["id", "class"])), [
        [vShow, $setup.isActive]
      ])
    ]),
    _: 3
  }, 8, ["duration", "onBeforeEnter", "onEnter", "onAfterEnter", "onBeforeLeave", "onLeave", "onAfterLeave"]))
}
var MDBCollapse = /*#__PURE__*/_export_sfc(_sfc_main$F, [['render',_sfc_render$F]]);

function MDBPopper() {
  const isPopperActive = ref(false);
  const triggerEl = ref(null);
  const popperEl = ref(null);
  const popper = ref(undefined);
  const popperOptions = reactive({});

  function setPopper(trigger, popper, config) {
    triggerEl.value = trigger;
    popperEl.value = popper;
    popperOptions.value = {
      placement: 'bottom',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 0]
          }
        }
      ],
      ...config
    };
  }

  function togglePopper() {
    isPopperActive.value = !isPopperActive.value;

    if (isPopperActive.value)
      nextTick(() => setupPopper());
  }

  function openPopper() {
    if (isPopperActive.value)
      return

    isPopperActive.value = true;
    nextTick(() => (popper.value = setupPopper()));
  }

  function closePopper() {
    if (!isPopperActive.value)
      return

    isPopperActive.value = !isPopperActive.value;
  }

  function setupPopper() {
    if (popper.value === undefined || !popper.value) {
      popper.value = createPopper(
        triggerEl.value,
        popperEl.value,
        popperOptions.value
      );
    }
    else {
      popper.value.update();
    }
  }

  function updatePopper(option, value) {
    popperOptions.value[option] = value;

    popper.value = createPopper(
      triggerEl.value,
      popperEl.value,
      popperOptions.value
    );
  }

  function destroyPopper() {
    if (!popper.value)
      return

    popper.value.destroy();
    popper.value = undefined;
  }

  function getPopperOffset(offset, element) {
    if (typeof offset === 'string')
      return offset.split(',').map(val => Number.parseInt(val, 10))

    if (typeof offset === 'function')
      return popperData => offset(popperData, element)

    return offset
  }

  return {
    setPopper,
    togglePopper,
    isPopperActive,
    openPopper,
    closePopper,
    updatePopper,
    destroyPopper,
    getPopperOffset
  }
}

const handleBreakpoints = (windowWidth, breakpointValues) => {
  const breakpoints = {
    none: {
      width: 0,
      attr: null
    },
    sm: {
      width: 576,
      attr: null
    },
    md: {
      width: 768,
      attr: null
    },
    lg: {
      width: 992,
      attr: null
    },
    xl: {
      width: 1200,
      attr: null
    },
    xxl: {
      width: 1400,
      attr: null
    },
    mega: {
      width: 10000,
      attr: null
    }
  };

  // replace breakpoints attr values with corresponding props values
  breakpointValues.forEach((value) => {
    const match = Object.keys(breakpoints).filter(breakpoint =>
      value.includes(breakpoint) ? breakpoint : false
    )[0];
    if (match)
      breakpoints[match].attr = value;
    else
      breakpoints.none.attr = value;
  });

  // create range object that holds props value
  // and its min and max window width range
  // ranges = {
  //   default: {
  //     min: 0,
  //     max: 768
  //   },
  //   afterMd: {
  //     min:768,
  //     max: 1200
  //   },
  //   afterXl: {
  //     min: 1200,
  //     max: 10000
  //   }
  // }

  const ranges = {};
  Object.keys(breakpoints).reduce((acc, cur, index) => {
    if (
      (breakpoints[acc].attr && breakpoints[cur].attr)
      || (breakpoints[acc].attr && !cur)
    ) {
      ranges[breakpoints[acc].attr] = {
        min: breakpoints[acc].width,
        max: breakpoints[cur].width
      };
      return cur
    }
    else if (breakpoints[acc].attr && !breakpoints[cur].attr) {
      if (index === Object.keys(breakpoints).length - 1) {
        ranges[breakpoints[acc].attr] = {
          min: breakpoints[acc].width,
          max: breakpoints[cur].width
        };
      }
      return acc
    }
  });

  // return single value that matches actual window width range
  const value = Object.keys(ranges).filter((key) => {
    if (windowWidth > ranges[key].min && windowWidth < ranges[key].max)
      return key
  })[0];

  return value
};

const _sfc_main$E = {
  name: 'MDBDropdown',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    boundary: {
      type: String,
      default: 'clippingParent'
    },
    btnGroup: {
      type: Boolean,
      default: false
    },
    dropup: {
      type: Boolean,
      default: false
    },
    dropend: {
      type: Boolean,
      default: false
    },
    dropstart: {
      type: Boolean,
      default: false
    },
    align: {
      type: [String, Array],
      default: 'start'
    },
    offset: {
      type: [Array, String, Function],
      default: () => [0, 0]
    },
    popperConfig: [null, Object, Function],
    target: String,
    modelValue: Boolean
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const className = computed(() => {
      return [
        props.btnGroup ? 'btn-group' : 'dropdown',
        props.dropup && 'dropup',
        props.dropend && 'dropend',
        props.dropstart && 'dropstart'
      ]
    });

    const {
      setPopper,
      isPopperActive,
      closePopper,
      openPopper,
      updatePopper,
      getPopperOffset
    } = MDBPopper();

    const root = ref('root');
    const triggerEl = ref(null);
    const popperEl = ref(null);
    const windowWidth = ref(0);

    const menuAlignClasses = ref('');
    provide('menuAlignClasses', menuAlignClasses);

    provide('closePopper', closePopper);

    // ------------------- isActive -------------------
    // controlled by modelValue property, triggers DropdownMenu visibilty
    // by toggling its v-if value on or off
    const isActive = ref(props.modelValue);

    watchEffect(() => (isActive.value = props.modelValue));
    provide('isActive', isActive);

    // ------------------- isMenuMounted -------------------
    // controls if DropdownMenu has been mounted into DOM and its element
    // can be targeted by the Popper setup function
    const isMenuMounted = ref(false);
    const dropdownMenu = ref(null);
    const setMenuMountedState = (boolean, menuRef) => {
      isMenuMounted.value = boolean;
      dropdownMenu.value = menuRef;
    };
    provide('setMenuMountedState', setMenuMountedState);

    // ------------------- Utilites and setups -------------------
    const popperPosition = props.dropup
      ? 'top'
      : props.dropend
        ? 'right'
        : props.dropstart
          ? 'left'
          : 'bottom';

    const getBreakpointValue = () => {
      windowWidth.value = window.innerWidth;

      let propsValues = props.align;
      if (typeof props.align === 'string')
        propsValues = ['start', props.align];

      const activeBrakpointValue = handleBreakpoints(
        windowWidth.value,
        propsValues
      );

      if (!activeBrakpointValue)
        return

      return activeBrakpointValue.includes('start') ? 'start' : 'end'
    };

    const listenToResize = () => {
      const align = getBreakpointValue();
      updatePopper('placement', `${popperPosition}-${align}`);
    };

    const getConfig = () => {
      if (typeof props.align === 'string') {
        menuAlignClasses.value = `dropdown-menu-${props.align}`;
      }
      else {
        menuAlignClasses.value = props.align.map(prop =>
          `dropdown-menu-${prop}`.trim()
        );
      }

      let align = props.align;
      if (
        typeof props.align !== 'string'
        || (props.align !== 'start' && props.align !== 'end')
      ) {
        align = getBreakpointValue();
        on(window, 'resize', listenToResize);
      }

      const placement = `${popperPosition}-${align}`;

      let boundary = document.querySelector(props.boundary);
      if (!boundary)
        boundary = props.boundary;

      const defaultBsPopperConfig = {
        placement,
        modifiers: [
          {
            name: 'preventOverflow',
            options: {
              boundary
            }
          },
          {
            name: 'offset',
            options: {
              offset: getPopperOffset(props.offset, root.value)
            }
          }
        ]
      };

      return {
        ...defaultBsPopperConfig,
        ...(typeof props.popperConfig === 'function'
          ? props.popperConfig(defaultBsPopperConfig)
          : props.popperConfig)
      }
    };

    const popperSetup = () => {
      triggerEl.value = props.target
        ? document.querySelector(props.target)
        : root.value.querySelector('[data-trigger]');
      popperEl.value = dropdownMenu.value;

      const config = getConfig();

      setPopper(triggerEl.value, popperEl.value, config);
    };

    const handleMenuMountedState = (mountedValue) => {
      if (mountedValue) {
        popperSetup();

        openPopper();
      }
      else {
        closePopper();
      }
    };

    // ------------------- isPopperActive -------------------
    // controls if Popper is mounted into DOM
    // also Poppers visibility triggers DropdownMenu open/close animation
    // with adding/removing 'show' class

    provide('isPopperActive', isPopperActive);
    provide('externalTarget', props.target);

    // ------------------- handleEscAndOutsideClick -------------------
    // mimics toggling modelValue when user click outside the toggle button
    // or close dropdown with escape button
    const handleEscAndOutsideClick = () => {
      emit('update:modelValue', false);
    };

    provide('handleEscAndOutsideClick', handleEscAndOutsideClick);

    onMounted(() => {
      windowWidth.value = window.innerWidth;

      watch(
        () => isMenuMounted.value,
        cur => handleMenuMountedState(cur),
        { immediate: true }
      );
    });

    onUnmounted(() => {
      off(window, 'resize', listenToResize);
    });

    return {
      className,
      root,
      props
    }
  }
};

function _sfc_render$E(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    ref: "root",
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]))
}
var MDBDropdown = /*#__PURE__*/_export_sfc(_sfc_main$E, [['render',_sfc_render$E]]);

var mdbClickOutside = {
  stopProp(e) {
    e.stopPropagation();
  },

  mounted(el, binding) {
    const handler = (e) => {
      if (!el.contains(e.target) && el !== e.target)
        binding.value(e);
    };
    el.clickOutside = handler;

    const event = binding.modifiers.mousedown ? 'mousedown' : 'click';

    document.addEventListener(event, el.clickOutside);
    document.addEventListener('touchstart', el.clickOutside);
  },

  unmounted(el, binding) {
    if (!el.clickOutside) return

    const event = binding.modifiers.mousedown ? 'mousedown' : 'click';

    document.removeEventListener(event, el.clickOutside);
    document.removeEventListener('touchstart', el.clickOutside);
    delete el.clickOutside;
  }
};

const _sfc_main$D = {
  name: 'MDBDropdownToggle',
  components: { MDBBtn },
  directives: {
    mdbClickOutside
  },
  props: {
    ...MDBBtn.props,
    tag: {
      type: String,
      default: 'button'
    },
    href: [String, null],
    split: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggle-dropdown'],
  setup(props) {
    const className = computed(() => {
      return [
        btnClass.value,
        'dropdown-toggle',
        props.split && 'dropdown-toggle-split',
        props.size && `btn-${props.size}`,
        props.outline && `btn-outline-${props.outline}`
      ]
    });

    const btnClass = computed(() => {
      if (props.tag !== 'button') return
      const color
        = props.color && !props.outline
          ? `btn-${props.color}`
          : props.outline
            ? ''
            : 'btn-primary';
      return `btn ${color}`
    });

    const expanded = ref(false);
    const toggle = () => {
      expanded.value = !expanded.value;
    };

    const isPopperActive = inject('isPopperActive', false);
    watchEffect(() => {
      expanded.value = isPopperActive.value;
    });

    const handleEscAndOutsideClick = inject('handleEscAndOutsideClick', false);

    const handleClickOutside = (e) => {
      if (isPopperActive && !e.target.closest('.dropdown-menu'))
        handleEscAndOutsideClick();
    };

    return {
      className,
      expanded,
      toggle,
      handleClickOutside,
      props
    }
  }
};

const _hoisted_1$f = {
  key: 1,
  class: "visually-hidden"
};

function _sfc_render$D(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_mdb_click_outside = resolveDirective("mdb-click-outside");

  return withDirectives((openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    type: "button",
    class: normalizeClass($setup.className),
    "aria-expanded": $setup.expanded,
    "aria-haspopup": "true",
    "data-trigger": "",
    onClick: $setup.toggle
  }, {
    default: withCtx(() => [
      (!$props.split)
        ? renderSlot(_ctx.$slots, "default", { key: 0 })
        : (openBlock(), createElementBlock("span", _hoisted_1$f, "Toggle Dropdown"))
    ]),
    _: 3
  }, 8, ["class", "aria-expanded", "onClick"])), [
    [_directive_mdb_click_outside, $setup.handleClickOutside]
  ])
}
var MDBDropdownToggle = /*#__PURE__*/_export_sfc(_sfc_main$D, [['render',_sfc_render$D]]);

const _sfc_main$C = {
  name: 'MDBDropdownMenu',
  inheritAttrs: false,
  props: {
    tag: {
      type: String,
      default: 'ul'
    },
    fadeIn: {
      type: String,
      default: 'fade-in'
    },
    fadeOut: {
      type: String,
      default: 'fade-out'
    },
    animation: {
      type: Boolean,
      default: true
    },
    dark: {
      type: Boolean,
      default: false
    },
    static: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const className = computed(() => {
      return [
        'dropdown-menu',
        menuAlignClasses.value,
        fadeClass.value,
        showClass.value && 'show',
        props.dark && 'dropdown-menu-dark'
      ]
    });
    const menuAlignClasses = inject('menuAlignClasses', 'dropdown-menu-start');
    const root = ref('root');
    const fadeClass = ref('');
    const showClass = ref(false);

    const staticStyle = computed(() => {
      return props.static ? { display: 'block', position: 'static' } : false
    });

    const handleAnimation = () => {
      if (!props.animation)
        return

      setTimeout(() => {
        fadeClass.value = false;
      }, 300);
    };

    // ------------------- isActive -------------------
    // controls if DropdownMenu is presented into DOM by isMounted value
    // controls close class and animation

    const setMenuMountedState = inject('setMenuMountedState', () => false);
    const isActive = inject('isActive', false);
    watch(
      () => isActive.value,
      (cur) => {
        if (cur) {
          setTimeout(() => {
            setMenuMountedState(true, root.value);
          }, 100);
        }
        else if (!cur && isPopperActive) {
          setInactive();

          setTimeout(() => {
            setMenuMountedState(false);
          }, 300);
        }
      }
    );

    const setInactive = () => {
      // keyboard navigation
      off(document, 'keydown', handleDown);
      count.value = 0;

      // close animation
      fadeClass.value = props.animation && `animation ${props.fadeOut}`;
      showClass.value = false;

      handleAnimation();
    };

    const isMounted = computed(() => {
      if (props.static) {
        // standalone DropdownMenu component that needs to be visible always
        return true
      }
      else if (isActive.value || (!isActive.value && isPopperActive.value)) {
        return true
      }
      else if (!isActive.value && !isPopperActive.value) {
        /* eslint-disable */
        setTimeout(() => {
          return false;
        }, 300);
        /* eslint-enable */
      }

      return false
    });

    const externalTarget = inject('externalTarget', false);
    const shouldTeleport = ref(false);

    onMounted(() => {
      if (externalTarget) {
        const target = document.body.querySelector(externalTarget);
        if (target)
          shouldTeleport.value = true;
      }
    });

    // ------------------- isPopperActive -------------------
    // controls if DropdownMenu is visible for user or not
    // controls show class and animation
    const isPopperActive = inject('isPopperActive', false);

    const setActive = () => {
      on(document, 'keydown', handleDown);
      fadeClass.value = props.animation && `animation ${props.fadeIn}`;

      handleAnimation();
    };

    watch(
      () => isPopperActive.value,
      (cur, prev) => {
        if ((!prev && cur === true) || prev === false) {
          items.value = root.value.querySelectorAll('.dropdown-item');

          showClass.value = true;
          setActive();
        }
      }
    );

    // ------------------- Utilities for keyboard navigation -------------------

    const count = ref(0);
    const items = ref(null);

    const handleEscAndOutsideClick = inject(
      'handleEscAndOutsideClick',
      () => false
    );

    const handleDown = (e) => {
      const key = e.key;
      if (key === 'ArrowUp' || key === 'ArrowDown')
        e.preventDefault();

      if (!isActive.value)
        return

      items.value.forEach((item) => {
        item.classList.remove('active');
      });

      switch (key) {
        case 'Escape':
          handleEscAndOutsideClick();
          return
        case 'Enter':
          items.value[count.value - 1]?.click();
          // setInactive();

          return
        case 'ArrowUp':
          count.value--;

          if (count.value <= 0)
            count.value = items.value.length;

          break
        case 'ArrowDown':
          count.value++;
          if (count.value > items.value.length)
            count.value = 1;

          break
      }

      items.value[count.value - 1]?.classList.add('active');
    };

    return {
      staticStyle,
      showClass,
      className,
      isMounted,
      shouldTeleport,
      externalTarget,
      root,
      props
    }
  }
};

function _sfc_render$C(_ctx, _cache, $props, $setup, $data, $options) {
  return (!$setup.shouldTeleport)
    ? (openBlock(), createBlock(Transition, { key: 0 }, {
        default: withCtx(() => [
          ($setup.isMounted)
            ? (openBlock(), createBlock(resolveDynamicComponent($props.tag), mergeProps({ key: 0 }, _ctx.$attrs, {
                ref: "root",
                class: $setup.className,
                style: $setup.staticStyle,
                "data-popper": ""
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }, 16, ["class", "style"]))
            : createCommentVNode("", true)
        ]),
        _: 3
      }))
    : (openBlock(), createBlock(Teleport, {
        key: 1,
        to: $setup.externalTarget
      }, [
        createVNode(Transition, null, {
          default: withCtx(() => [
            ($setup.isMounted)
              ? (openBlock(), createBlock(resolveDynamicComponent($props.tag), mergeProps({ key: 0 }, _ctx.$attrs, {
                  ref: "root",
                  class: $setup.className,
                  style: $setup.staticStyle,
                  "data-popper": $setup.externalTarget
                }), {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "default")
                  ]),
                  _: 3
                }, 16, ["class", "style", "data-popper"]))
              : createCommentVNode("", true)
          ]),
          _: 3
        })
      ], 8, ["to"]))
}
var MDBDropdownMenu = /*#__PURE__*/_export_sfc(_sfc_main$C, [['render',_sfc_render$C]]);

const _sfc_main$B = {
  name: 'MDBDropdownItem',
  inheritAttrs: false,
  props: {
    tag: {
      type: String,
      default: 'a'
    },
    to: [String, Object],
    href: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    exact: {
      type: Boolean,
      default: false
    },
    newTab: {
      type: Boolean,
      default: false
    },
    submenu: {
      type: Boolean,
      default: false
    },
    submenuIcon: String,
    divider: {
      type: Boolean,
      default: false
    },
    text: {
      type: Boolean,
      default: false
    },
    header: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const className = computed(() => {
      return [
        dropdownClass.value,
        props.disabled ? 'disabled' : '',
        props.active ? 'active' : '',
        props.submenu && 'dropdown-submenu'
      ]
    });

    const hasLinkOrTag = computed(() => {
      if (
        props.to !== undefined
        || props.href !== undefined
        || props.tag !== 'a'
        || props.text
      )
        return true

      return false
    });

    const dropdownClass = computed(() => {
      if (props.text)
        return 'dropdown-item-text'
      else if (props.header)
        return 'dropdown-header'

      return 'dropdown-item'
    });

    const tagName = computed(() => {
      if (props.to)
        return 'router-link'
      else if (props.text)
        return 'span'

      return props.tag
    });

    const tab = computed(() => {
      if (props.newTab)
        return '_blank'

      return null
    });

    return {
      className,
      hasLinkOrTag,
      tagName,
      tab,
      props
    }
  }
};

const _hoisted_1$e = ["tabindex"];
const _hoisted_2$b = {
  key: 1,
  class: "dropdown-divider"
};

function _sfc_render$B(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("li", {
    tabindex: $props.divider ? null : 0,
    onKeyup: _cache[0] || (_cache[0] = withKeys(withModifiers((...args) => (_ctx.handleKeypress && _ctx.handleKeypress(...args)), ["stop"]), ["enter"]))
  }, [
    ($setup.hasLinkOrTag)
      ? (openBlock(), createBlock(resolveDynamicComponent($setup.tagName), mergeProps({ key: 0 }, _ctx.$attrs, {
          to: $props.to,
          exact: $props.to ? $props.exact : null,
          href: $props.to ? null : $props.href,
          class: $setup.className,
          target: $setup.tab,
          type: $props.tag === 'button' ? 'button' : null,
          "aria-current": $props.active ? true : null,
          "aria-disabled": $props.disabled ? true : null,
          disabled: $props.disabled ? true : null
        }), {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        }, 16, ["to", "exact", "href", "class", "target", "type", "aria-current", "aria-disabled", "disabled"]))
      : ($props.divider)
        ? (openBlock(), createElementBlock("hr", _hoisted_2$b))
        : renderSlot(_ctx.$slots, "default", { key: 2 })
  ], 40, _hoisted_1$e))
}
var MDBDropdownItem = /*#__PURE__*/_export_sfc(_sfc_main$B, [['render',_sfc_render$B]]);

const _sfc_main$A = {
  name: 'MDBTooltip',
  props: {
    tag: {
      type: String,
      default: 'span'
    },
    modelValue: Boolean,
    reference: String,
    popover: String,
    options: {
      type: [Object, Function],
      default() {
        return {}
      }
    },
    boundary: {
      type: String,
      default: 'clippingParent'
    },
    fallbackPlacements: {
      type: Array,
      default: () => ['top', 'right', 'bottom', 'left']
    },
    offset: {
      type: String,
      default: '0, 5'
    },
    direction: {
      type: String,
      default: 'top',
      validator: value =>
        ['top', 'right', 'bottom', 'left'].includes(value.toLowerCase())
    },
    maxWidth: {
      type: Number,
      default: 276
    },
    arrow: {
      type: Boolean,
      default: false
    },
    disabled: Boolean
  },
  setup(props, { emit }) {
    const {
      setPopper,
      isPopperActive,
      openPopper,
      closePopper,
      getPopperOffset
    } = MDBPopper();
    const triggerEl = ref('triggerEl');
    const popperEl = ref('popperEl');

    const widthStyle = computed(
      () => `max-width: ${props.maxWidth}px!important`
    );

    const getConfig = () => {
      const placement = props.direction;

      let boundary = document.querySelector(props.boundary);
      if (!boundary)
        boundary = props.boundary;

      const defaultBsPopperConfig = {
        placement,
        modifiers: [
          {
            name: 'flip',
            options: {
              fallbackPlacements: props.fallbackPlacements
            }
          },
          {
            name: 'preventOverflow',
            options: {
              boundary
            }
          },
          {
            name: 'offset',
            options: {
              offset: getPopperOffset(props.offset, triggerEl.value)
            }
          },
          {
            name: 'arrow',
            options: {
              element: '.tooltip_arrow',
              padding: 5
            }
          }
        ]
      };

      return {
        ...defaultBsPopperConfig,
        ...(typeof props.options === 'function'
          ? props.options(defaultBsPopperConfig)
          : props.options)
      }
    };

    const popperSetup = () => {
      triggerEl.value = props.reference
        ? document.querySelector(props.reference)
        : triggerEl.value;
      popperEl.value = props.popover
        ? document.querySelector(props.popover)
        : popperEl.value;

      const config = getConfig();

      setPopper(triggerEl.value, popperEl.value, config);
    };

    const isThrottled = ref(false);

    watchEffect(() => {
      if (props.modelValue) {
        if (isThrottled.value)
          return

        nextTick(() => {
          popperSetup();

          setTimeout(openPopper, 0);
          setTimeout(() => {
            popperEl.value.classList.add('show');
          }, 0);
        });
      }
      else {
        if (!isPopperActive.value)
          return

        setTimeout(() => {
          popperEl.value.classList.remove('show');
        }, 10);

        isThrottled.value = true;

        setTimeout(() => {
          closePopper();
          isThrottled.value = false;
        }, 150);
      }
    });

    const isActive = computed(() => {
      if (props.modelValue || (!props.modelValue && isPopperActive.value))
        return true
      else if (!props.modelValue && !isPopperActive.value)
        return false

      return false
    });

    const onMouseEnter = () => {
      !props.disabled && emit('update:modelValue', true);
    };
    const onMouseLeave = () => {
      !props.disabled && emit('update:modelValue', false);
    };

    return {
      isActive,
      triggerEl,
      popperEl,
      widthStyle,
      onMouseEnter,
      onMouseLeave,
      props
    }
  }
};

const _hoisted_1$d = {
  key: 0,
  "data-popper-arrow": "",
  class: "tooltip_arrow"
};

function _sfc_render$A(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock(Fragment, null, [
    (openBlock(), createBlock(resolveDynamicComponent($props.tag), mergeProps({
      ref: "triggerEl",
      style: {"display":"inline-block"}
    }, _ctx.$attrs, {
      onMouseenter: $setup.onMouseEnter,
      onMouseleave: $setup.onMouseLeave,
      onFocus: $setup.onMouseEnter,
      onBlur: $setup.onMouseLeave
    }), {
      default: withCtx(() => [
        renderSlot(_ctx.$slots, "reference")
      ]),
      _: 3
    }, 16, ["onMouseenter", "onMouseleave", "onFocus", "onBlur"])),
    createVNode(Transition, { name: "fade" }, {
      default: withCtx(() => [
        ($setup.isActive)
          ? (openBlock(), createElementBlock("div", {
              key: 0,
              ref: "popperEl",
              class: normalizeClass({
        tooltip: true,
        fade: true,
        'tooltip-inner': true,
      }),
              style: normalizeStyle([$setup.widthStyle])
            }, [
              renderSlot(_ctx.$slots, "tip"),
              ($props.arrow)
                ? (openBlock(), createElementBlock("div", _hoisted_1$d))
                : createCommentVNode("", true)
            ], 4))
          : createCommentVNode("", true)
      ]),
      _: 3
    })
  ], 64))
}
var MDBTooltip = /*#__PURE__*/_export_sfc(_sfc_main$A, [['render',_sfc_render$A]]);

const _sfc_main$z = {
  name: 'MDBPopover',
  directives: {
    mdbClickOutside
  },
  props: {
    tag: {
      type: String,
      default: 'span'
    },
    modelValue: Boolean,
    reference: String,
    popover: String,
    options: {
      type: [Object, Function],
      default() {
        return {}
      }
    },
    boundary: {
      type: String,
      default: 'clippingParent'
    },
    fallbackPlacements: {
      type: Array,
      default: () => ['top', 'right', 'bottom', 'left']
    },
    offset: {
      type: String,
      default: '0, 5'
    },
    direction: {
      type: String,
      default: 'bottom',
      validator: value =>
        ['top', 'right', 'bottom', 'left'].includes(value.toLowerCase())
    },
    maxWidth: {
      type: Number,
      default: 276
    },
    arrow: {
      type: Boolean,
      default: false
    },
    dismissible: {
      type: Boolean,
      default: false
    },
    hover: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const {
      setPopper,
      isPopperActive,
      openPopper,
      closePopper,
      destroyPopper,
      getPopperOffset
    } = MDBPopper();
    const triggerEl = ref('triggerEl');
    const popperEl = ref('popperEl');

    const widthStyle = computed(
      () => `max-width: ${props.maxWidth}px!important`
    );

    const getOffset = () => {
      if (!props.arrow)
        return props.offset

      return [0, 10]
    };

    const getConfig = () => {
      const placement = props.direction;

      let boundary = document.querySelector(props.boundary);
      if (!boundary)
        boundary = props.boundary;

      const offset = getOffset();

      const defaultBsPopperConfig = {
        placement,
        modifiers: [
          {
            name: 'flip',
            options: {
              fallbackPlacements: props.fallbackPlacements
            }
          },
          {
            name: 'preventOverflow',
            options: {
              boundary
            }
          },
          {
            name: 'offset',
            options: {
              offset: getPopperOffset(offset, triggerEl.value)
            }
          },
          {
            name: 'arrow',
            options: {
              element: '.popover_arrow',
              padding: 5
            }
          }
        ]
      };

      return {
        ...defaultBsPopperConfig,
        ...(typeof props.options === 'function'
          ? props.options(defaultBsPopperConfig)
          : props.options)
      }
    };

    const popperSetup = () => {
      triggerEl.value = props.reference
        ? document.querySelector(props.reference)
        : triggerEl.value;
      popperEl.value = props.popover
        ? document.querySelector(props.popover)
        : popperEl.value;

      const config = getConfig();

      setPopper(triggerEl.value, popperEl.value, config);
    };

    const isActive = computed(() => {
      if (props.modelValue || (!props.modelValue && isPopperActive.value))
        return true
      else if (!props.modelValue && !isPopperActive.value)
        return false

      return false
    });

    const onMouseOver = () => {
      emit('update:modelValue', true);
    };
    const onMouseOut = () => {
      emit('update:modelValue', false);
    };

    const handleClickOutside = () => {
      if (!props.dismissible || !props.modelValue)
        return

      emit('update:modelValue', false);
    };

    const destroy = () => {
      off(triggerEl.value, 'mouseover', onMouseOver);
      off(triggerEl.value, 'mouseout', onMouseOut);

      destroyPopper();
    };

    onMounted(() => {
      watchEffect(() => {
        if (props.modelValue) {
          nextTick(() => {
            popperSetup();

            setTimeout(openPopper, 0);
            setTimeout(() => {
              popperEl.value.classList.add('show');

              if (props.hover) {
                on(popperEl.value, 'mouseover', onMouseOver);
                on(popperEl.value, 'mouseout', onMouseOut);
              }
            }, 0);
          });
        }
        else {
          if (!isPopperActive.value)
            return

          setTimeout(() => {
            off(popperEl.value, 'mouseover', onMouseOver);
            off(popperEl.value, 'mouseout', onMouseOut);

            popperEl.value.classList.remove('show');
          }, 0);
          setTimeout(closePopper, 0);
          destroyPopper();
        }
      });
      if (props.hover) {
        on(triggerEl.value, 'mouseover', onMouseOver);
        on(triggerEl.value, 'mouseout', onMouseOut);
      }
    });

    onUnmounted(() => {
      destroy();
    });

    return {
      isActive,
      triggerEl,
      popperEl,
      widthStyle,
      handleClickOutside,
      props
    }
  }
};

const _hoisted_1$c = {
  key: 0,
  class: "popover-header"
};
const _hoisted_2$a = {
  key: 1,
  class: "popover-body"
};
const _hoisted_3$7 = {
  key: 2,
  "data-popper-arrow": "",
  class: "popover_arrow"
};

function _sfc_render$z(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_mdb_click_outside = resolveDirective("mdb-click-outside");

  return (openBlock(), createElementBlock(Fragment, null, [
    withDirectives((openBlock(), createBlock(resolveDynamicComponent($props.tag), mergeProps({
      ref: "triggerEl",
      style: {"display":"inline-block"},
      tabindex: $props.dismissible ? 0 : null
    }, _ctx.$attrs), {
      default: withCtx(() => [
        renderSlot(_ctx.$slots, "reference")
      ]),
      _: 3
    }, 16, ["tabindex"])), [
      [_directive_mdb_click_outside, $setup.handleClickOutside]
    ]),
    createVNode(Transition, null, {
      default: withCtx(() => [
        ($setup.isActive && (_ctx.$slots.header || _ctx.$slots.body))
          ? (openBlock(), createElementBlock("div", {
              key: 0,
              ref: "popperEl",
              class: normalizeClass({ popover: true, fade: true }),
              style: normalizeStyle([$setup.widthStyle])
            }, [
              (_ctx.$slots.header)
                ? (openBlock(), createElementBlock("div", _hoisted_1$c, [
                    renderSlot(_ctx.$slots, "header")
                  ]))
                : createCommentVNode("", true),
              (_ctx.$slots.body)
                ? (openBlock(), createElementBlock("div", _hoisted_2$a, [
                    renderSlot(_ctx.$slots, "body")
                  ]))
                : createCommentVNode("", true),
              renderSlot(_ctx.$slots, "default"),
              ($props.arrow)
                ? (openBlock(), createElementBlock("div", _hoisted_3$7))
                : createCommentVNode("", true)
            ], 4))
          : createCommentVNode("", true)
      ]),
      _: 3
    })
  ], 64))
}
var MDBPopover = /*#__PURE__*/_export_sfc(_sfc_main$z, [['render',_sfc_render$z]]);

function MDBFocusTrap() {
  const trapElement = ref(null);
  const firstFocusableElement = ref(null);
  const lastFocusableElement = ref(null);

  function initFocusTrap(element) {
    trapElement.value = element;

    calculateFocusTrap();

    on(window, 'keydown', focusFirstElement);

    return true
  }

  function calculateFocusTrap() {
    const focusable = Array.from(
      trapElement.value.querySelectorAll(
        'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => {
      return (
        !el.classList.contains('ps__thumb-x')
        && !el.classList.contains('ps__thumb-y')
        && !el.disabled
      )
    });

    if (focusable.length === 0) return

    firstFocusableElement.value = focusable[0];

    lastFocusableElement.value = focusable[focusable.length - 1];
    on(lastFocusableElement.value, 'keydown', e =>
      handleLastElementKeydown(e)
    );
  }

  function handleLastElementKeydown(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      focusTrap();
    }
  }

  function focusTrap() {
    if (!firstFocusableElement.value) return

    firstFocusableElement.value.focus();
  }

  function focusFirstElement(e, trap = false) {
    if (e.key === 'Tab') {
      e.preventDefault();
      focusTrap();
    }
    if (trap) return
    off(window, 'keydown', focusFirstElement);
  }

  function removeFocusTrap() {
    off(lastFocusableElement.value, 'keydown', handleLastElementKeydown);
  }

  return {
    initFocusTrap,
    removeFocusTrap
  }
}

const _sfc_main$y = {
  name: 'MDBModal',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    modelValue: Boolean,
    size: {
      type: String,
      validator: value =>
        ['sm', 'lg', 'xl'].includes(value.toLowerCase())
    },
    removeBackdrop: {
      type: Boolean,
      default: false
    },
    staticBackdrop: {
      type: Boolean,
      default: false
    },
    centered: {
      type: Boolean,
      default: false
    },
    bgSrc: {
      type: String,
      default: ''
    },
    scrollable: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 400
    },
    labelledby: String,
    fullscreen: {
      type: [Boolean, String],
      default: false
    },
    animation: {
      type: Boolean,
      default: true
    },
    dialogClasses: {
      type: String
    },
    transform: String,
    keyboard: {
      type: Boolean,
      default: true
    },
    focus: {
      type: Boolean,
      default: true
    }
  },
  emits: ['show', 'shown', 'hide', 'hidden', 'update:modelValue'],
  setup(props, { emit }) {
    const root = ref('root');
    const dialog = ref('dialog');
    const dialogTransform = ref('');
    const focusTrap = ref(null);

    const isActive = ref(props.modelValue);

    const thisElement = ref(null);

    watchEffect(() => {
      isActive.value = props.modelValue;
      if (isActive.value)
        emit('update:modelValue', true);
    });

    const wrapperClass = computed(() => {
      return [
        'modal',
        props.animation && 'fade',
        isActive.value && 'show',
        props.staticBackdrop && 'modal-static'
      ]
    });

    const dialogClass = computed(() => {
      return [
        'modal-dialog',
        props.size && `modal-${props.size}`,
        props.centered && 'modal-dialog-centered',
        props.scrollable && 'modal-dialog-scrollable',
        props.fullscreen && fullscreenClass.value,
        props.dialogClasses
      ]
    });

    const backdropStyle = computed(() => {
      return props.removeBackdrop
        ? false
        : { 'background-color': 'rgba(0,0,0, 0.5)' }
    });

    // shouldOverflow with backdropOverflowStyle prevents bottom modal create additional scrollbar on show
    const shouldOverflow = ref(
      props.transform !== 'translate(0,25%)'
    );
    const backdropOverflowStyle = computed(() => {
      if (shouldOverflow.value)
        return

      return 'overflow: hidden'
    });

    const computedContentStyle = computed(() => {
      return props.bgSrc
        ? { 'background-image': `url("${props.bgSrc}")` }
        : false
    });

    const fullscreenClass = computed(() => {
      if (!props.fullscreen)
        return false

      return [
        props.fullscreen !== true
          ? `modal-fullscreen-${props.fullscreen}`
          : 'modal-fullscreen'
      ]
    });

    const animateStaticBackdrop = () => {
      animateStaticModal(dialog.value);
    };

    const closeModal = () => {
      emit('update:modelValue', false);
    };

    provide('closeModal', closeModal);

    const animateStaticModal = (el) => {
      el.style.transform = 'scale(1.02)';
      setTimeout(() => (el.style.transform = 'scale(1.0)'), 300);
    };

    const handleEscKeyUp = (e) => {
      if (e.key === 'Escape' && isActive.value)
        closeModal();
    };

    const isBodyOverflowing = ref(null);
    const scrollbarWidth = ref(0);

    // Bootstrap way to measure scrollbar width
    const getScrollbarWidth = () => {
      const scrollDiv = document.createElement('div');
      scrollDiv.className = 'modal-scrollbar-measure';
      document.body.appendChild(scrollDiv);
      const scrollbarWidth
        = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth
    };

    const setScrollbar = () => {
      const rect = document.body.getBoundingClientRect();
      isBodyOverflowing.value
        = Math.round(rect.left + rect.right) < window.innerWidth;
      scrollbarWidth.value = isBodyOverflowing.value
        ? getScrollbarWidth().toFixed(2)
        : 0;
    };

    const enter = (el) => {
      shouldOverflow.value
        = props.transform !== 'translate(0,25%)';

      dialogTransform.value = props.transform || 'translate(0, -25%)';

      el.childNodes[0].style.transform = dialogTransform.value;
      el.style.opacity = 0;
      el.style.display = 'block';

      setScrollbar();
      document.body.style.paddingRight = `${scrollbarWidth.value}px`;
      el.style.paddingRight = `${scrollbarWidth.value}px`;
      document.body.classList.add('modal-open');

      emit('show', root.value);
    };
    const afterEnter = (el) => {
      el.childNodes[0].style.transform = 'translate(0,0)';
      el.style.opacity = 1;

      setTimeout(() => {
        shouldOverflow.value = true;
        emit('shown', root.value);
      }, 400);
      thisElement.value = root.value;

      if (props.keyboard)
        on(window, 'keyup', handleEscKeyUp);

      if (props.focus) {
        focusTrap.value = MDBFocusTrap();
        focusTrap.value.initFocusTrap(root.value);
      }
    };
    const beforeLeave = (el) => {
      el.childNodes[0].style.transform = dialogTransform.value;
      el.style.opacity = 0;
      setTimeout(() => {
        el.style.paddingRight = null;
        document.body.style.paddingRight = null;
        document.body.classList.remove('modal-open');
      }, 200);

      emit('hide', thisElement.value);

      if (props.keyboard)
        off(window, 'keyup', handleEscKeyUp);

      if (props.focus && focusTrap.value)
        focusTrap.value.removeFocusTrap();
    };
    const afterLeave = () => {
      emit('hidden', thisElement.value);
      shouldOverflow.value = false;
    };

    onBeforeUnmount(() => {
      off(window, 'keyup', handleEscKeyUp);
    });

    return {
      wrapperClass,
      dialogClass,
      backdropStyle,
      backdropOverflowStyle,
      computedContentStyle,
      root,
      dialog,
      isActive,
      closeModal,
      animateStaticBackdrop,
      enter,
      afterEnter,
      beforeLeave,
      afterLeave,
      props
    }
  }
};

function _sfc_render$y(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(Transition, {
    onEnter: $setup.enter,
    onAfterEnter: $setup.afterEnter,
    onBeforeLeave: $setup.beforeLeave,
    onAfterLeave: $setup.afterLeave
  }, {
    default: withCtx(() => [
      ($setup.isActive)
        ? (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
            key: 0,
            ref: "root",
            class: normalizeClass($setup.wrapperClass),
            style: normalizeStyle([$setup.backdropStyle, $setup.backdropOverflowStyle]),
            "aria-hidden": !$setup.isActive,
            "aria-modal": $setup.isActive ? true : null,
            "aria-labelledby": $props.labelledby,
            role: "dialog",
            onClick: _cache[0] || (_cache[0] = withModifiers(
        () => {
          if ($props.staticBackdrop) {
            $setup.animateStaticBackdrop();
          } else {
            $setup.closeModal();
          }
        }
      , ["self"]))
          }, {
            default: withCtx(() => [
              createElementVNode("div", {
                ref: "dialog",
                class: normalizeClass($setup.dialogClass),
                role: "document"
              }, [
                createElementVNode("div", {
                  class: "modal-content",
                  style: normalizeStyle($setup.computedContentStyle)
                }, [
                  renderSlot(_ctx.$slots, "default")
                ], 4)
              ], 2)
            ]),
            _: 3
          }, 8, ["class", "style", "aria-hidden", "aria-modal", "aria-labelledby"]))
        : createCommentVNode("", true)
    ]),
    _: 3
  }, 8, ["onEnter", "onAfterEnter", "onBeforeLeave", "onAfterLeave"]))
}
var MDBModal = /*#__PURE__*/_export_sfc(_sfc_main$y, [['render',_sfc_render$y]]);

const _sfc_main$x = {
  name: 'MDBModalHeader',
  components: {
    MDBBtnClose
  },
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    close: {
      type: Boolean,
      default: true
    },
    closeWhite: {
      type: Boolean,
      default: false
    },
    color: String
  },
  setup(props) {
    const closeModal = inject('closeModal', false);

    const className = computed(() => {
      return ['modal-header', props.color && `bg-${props.color}`]
    });

    return {
      className,
      closeModal,
      props
    }
  }
};

function _sfc_render$x(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_MDBBtnClose = resolveComponent("MDBBtnClose");

  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default"),
      ($props.close)
        ? (openBlock(), createBlock(_component_MDBBtnClose, {
            key: 0,
            white: $props.closeWhite,
            onClick: withModifiers($setup.closeModal, ["prevent"])
          }, null, 8, ["white", "onClick"]))
        : createCommentVNode("", true)
    ]),
    _: 3
  }, 8, ["class"]))
}
var MDBModalHeader = /*#__PURE__*/_export_sfc(_sfc_main$x, [['render',_sfc_render$x]]);

const _sfc_main$w = {
  name: 'MDBModalTitle',
  props: {
    tag: {
      type: String,
      default: 'h5'
    },
    bold: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const className = computed(() => {
      return ['modal-title', props.bold && 'font-weight-bold']
    });

    return {
      className,
      props
    }
  }
};

function _sfc_render$w(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]))
}
var MDBModalTitle = /*#__PURE__*/_export_sfc(_sfc_main$w, [['render',_sfc_render$w]]);

const _sfc_main$v = {
  name: 'MDBModalBody',
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },
  setup(props) {
    const className = computed(() => {
      return ['modal-body']
    });

    return {
      className,
      props
    }
  }
};

function _sfc_render$v(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]))
}
var MDBModalBody = /*#__PURE__*/_export_sfc(_sfc_main$v, [['render',_sfc_render$v]]);

const _sfc_main$u = {
  name: 'MDBModalFooter',
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },
  setup(props) {
    const className = computed(() => {
      return ['modal-footer']
    });

    return {
      className,
      props
    }
  }
};

function _sfc_render$u(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]))
}
var MDBModalFooter = /*#__PURE__*/_export_sfc(_sfc_main$u, [['render',_sfc_render$u]]);

const _sfc_main$t = {
  name: 'MDBAccordion',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    modelValue: String,
    stayOpen: Boolean,
    flush: Boolean,
    classes: String
  },
  setup(props, { emit }) {
    const accordionRef = ref(null);
    const className = computed(() => {
      return ['accordion', props.flush && 'accordion-flush', props.classes]
    });

    const activeItem = ref(props.modelValue);
    const setActiveItem = (item) => {
      activeItem.value = item;
      emit('update:modelValue', item);
    };

    watchEffect(() => (activeItem.value = props.modelValue));

    provide('activeItem', activeItem);
    provide('stayOpen', props.stayOpen);
    provide('setActiveItem', setActiveItem);

    return {
      accordionRef,
      setActiveItem,
      className
    }
  }
};

function _sfc_render$t(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    ref: "accordionRef",
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]))
}
var MDBAccordion = /*#__PURE__*/_export_sfc(_sfc_main$t, [['render',_sfc_render$t]]);

const _sfc_main$s = {
  name: 'MDBAccordionItem',
  components: {
    MDBCollapse
  },
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    collapseId: {
      type: String,
      required: true
    },
    headerTitle: String,
    headerClasses: String,
    bodyClasses: String,
    itemClasses: String
  },
  setup(props) {
    const itemRef = ref(null);
    const itemClassName = computed(() => {
      return ['accordion-item', props.itemClasses]
    });
    const headerClassName = computed(() => {
      return ['accordion-header', props.headerClasses]
    });
    const bodyClassName = computed(() => {
      return ['accordion-body', props.bodyClasses]
    });
    const buttonClassName = computed(() => {
      return ['accordion-button', !isActive.value && 'collapsed']
    });

    const setActiveItem = inject('setActiveItem', null);
    const activeItem = inject('activeItem', null);
    const stayOpen = inject('stayOpen', false);

    const isActive = ref(activeItem.value === props.collapseId);

    watchEffect(() => {
      if (stayOpen)
        return

      isActive.value = activeItem.value === props.collapseId;
    });

    const toggleAccordion = () => {
      if (stayOpen)
        isActive.value = !isActive.value;
      else
        isActive.value ? setActiveItem('') : setActiveItem(props.collapseId);
    };

    return {
      itemRef,
      itemClassName,
      headerClassName,
      bodyClassName,
      buttonClassName,
      toggleAccordion,
      isActive
    }
  }
};

const _hoisted_1$b = ["aria-controls"];

function _sfc_render$s(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_MDBCollapse = resolveComponent("MDBCollapse");

  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    ref: "itemRef",
    class: normalizeClass($setup.itemClassName)
  }, {
    default: withCtx(() => [
      createElementVNode("h2", {
        class: normalizeClass($setup.headerClassName)
      }, [
        createElementVNode("button", {
          class: normalizeClass($setup.buttonClassName),
          "aria-expanded": "true",
          "aria-controls": $props.collapseId,
          onClick: _cache[0] || (_cache[0] = () => $setup.toggleAccordion($props.collapseId))
        }, toDisplayString($props.headerTitle), 11, _hoisted_1$b)
      ], 2),
      createVNode(_component_MDBCollapse, {
        id: $props.collapseId,
        modelValue: $setup.isActive,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (($setup.isActive) = $event))
      }, {
        default: withCtx(() => [
          createElementVNode("div", {
            class: normalizeClass($setup.bodyClassName)
          }, [
            renderSlot(_ctx.$slots, "default")
          ], 2)
        ]),
        _: 3
      }, 8, ["id", "modelValue"])
    ]),
    _: 3
  }, 8, ["class"]))
}
var MDBAccordionItem = /*#__PURE__*/_export_sfc(_sfc_main$s, [['render',_sfc_render$s]]);

const _sfc_main$r = {
  name: 'MDBIcon',
  props: {
    iconStyle: {
      type: String,
      default: 'fas'
    },
    icon: String,
    flag: String,
    size: String
  },
  setup(props) {
    const className = computed(() => {
      return [
        !props.flag && props.iconStyle,
        props.flag ? `flag flag-${props.flag}` : `fa-${props.icon}`,
        props.size && `fa-${props.size}`
      ]
    });

    return {
      className
    }
  }
};

function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("i", {
    class: normalizeClass($setup.className)
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2))
}
var MDBIcon = /*#__PURE__*/_export_sfc(_sfc_main$r, [['render',_sfc_render$r]]);

const _sfc_main$q = {
  name: 'MDBNavbar',
  props: {
    tag: {
      type: String,
      default: 'nav'
    },
    bg: {
      type: String
    },
    dark: {
      type: Boolean,
      default: false
    },
    light: {
      type: Boolean,
      default: false
    },
    double: {
      type: Boolean,
      default: false
    },
    expand: {
      type: String
    },
    position: {
      type: String
    },
    transparent: {
      type: Boolean,
      default: false
    },
    scrolling: {
      type: Boolean,
      default: false
    },
    scrollingOffset: {
      type: Number,
      default: 100
    },
    center: {
      type: Boolean,
      default: false
    },
    container: {
      type: [Boolean, String],
      default: false
    },
    classContainer: {
      type: String
    },
    classNavbar: String
  },
  setup(props) {
    const navClass = computed(() => {
      return [
        'navbar',
        props.dark && 'navbar-dark',
        props.light && 'navbar-light',
        props.bg && !props.transparent ? `bg-${props.bg}` : '',
        props.expand
          ? props.expand === 'small' || props.expand === 'sm'
            ? 'navbar-expand-sm'
            : props.expand === 'medium' || props.expand === 'md'
              ? 'navbar-expand-md'
              : props.expand === 'large' || props.expand === 'lg'
                ? 'navbar-expand-lg'
                : 'navbar-expand-xl'
          : '',
        props.position === 'top'
          ? 'fixed-top'
          : props.position === 'bottom'
            ? 'fixed-bottom'
            : props.position === 'sticky'
              ? 'sticky-top'
              : '',
        props.scrolling && scrollingClass.value,
        props.double && 'double-nav',
        props.center && 'justify-content-center',
        props.classNavbar
      ]
    });

    const containerClass = computed(() => {
      if (!props.container)
        return false

      return [
        props.container !== true
          ? `container-${props.container}`
          : 'container-fluid',
        props.classContainer && props.classContainer
      ]
    });

    const scrollingClass = ref('navbar-scroll');

    const handleScroll = () => {
      if (window.pageYOffset > props.scrollingOffset)
        scrollingClass.value = 'navbar-scroll navbar-scrolled';
      else
        scrollingClass.value = 'navbar-scroll';
    };

    const navbar = ref(null);
    const navbarFlexWrapValue = ref('nowrap');
    provide('navbarFlexWrapValue', navbarFlexWrapValue);

    const handleResize = () => {
      if (!navbar.value) return

      const wrap = getComputedStyle(navbar.value).flexWrap;

      if (wrap === 'nowrap')
        navbarFlexWrapValue.value = 'nowrap';
      else if (wrap === 'wrap')
        navbarFlexWrapValue.value = 'wrap';
    };

    onMounted(() => {
      if (
        getComputedStyle(navbar.value)
        && getComputedStyle(navbar.value).flexWrap === 'wrap'
      )
        navbarFlexWrapValue.value = 'wrap';
      else
        navbarFlexWrapValue.value = 'nowrap';

      window.addEventListener('resize', () => handleResize());

      if (props.scrolling)
        window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      }
    });

    return {
      navbar,
      navClass,
      containerClass,
      props
    }
  }
};

function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    ref: "navbar",
    class: normalizeClass($setup.navClass),
    role: "navigation"
  }, {
    default: withCtx(() => [
      ($props.container)
        ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass($setup.containerClass)
          }, [
            renderSlot(_ctx.$slots, "default")
          ], 2))
        : createCommentVNode("", true),
      (!$props.container)
        ? renderSlot(_ctx.$slots, "default", { key: 1 })
        : createCommentVNode("", true)
    ]),
    _: 3
  }, 8, ["class"]))
}
var MDBNavbar = /*#__PURE__*/_export_sfc(_sfc_main$q, [['render',_sfc_render$q]]);

const _sfc_main$p = {
  name: 'MDBNavbarToggler',
  components: {
    MDBIcon
  },
  props: {
    tag: {
      type: String,
      default: 'button'
    },
    target: {
      type: String,
      default: '#navbarSupportedContent'
    },
    togglerClass: {
      type: String
    },
    togglerIcon: {
      type: String,
      default: 'bars'
    },
    togglerSize: {
      type: String,
      default: '1x'
    },
    iconStyle: {
      type: String,
      default: 'fas'
    }
  },
  setup(props) {
    const navTogglerClass = computed(() => {
      return ['navbar-toggler', props.togglerClass]
    });

    const isExpanded = ref(false);

    const handleClick = () => {
      isExpanded.value = !isExpanded.value;
    };

    return {
      navTogglerClass,
      handleClick,
      isExpanded,
      props
    }
  }
};

function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_MDBIcon = resolveComponent("MDBIcon");

  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.navTogglerClass),
    type: "button",
    "aria-controls": $props.target,
    "aria-expanded": $setup.isExpanded,
    "aria-label": "Toggle navigation",
    onClick: $setup.handleClick
  }, {
    default: withCtx(() => [
      createVNode(_component_MDBIcon, {
        icon: $props.togglerIcon,
        size: $props.togglerSize,
        "icon-style": $props.iconStyle
      }, null, 8, ["icon", "size", "icon-style"])
    ]),
    _: 1
  }, 8, ["class", "aria-controls", "aria-expanded", "onClick"]))
}
var MDBNavbarToggler = /*#__PURE__*/_export_sfc(_sfc_main$p, [['render',_sfc_render$p]]);

const _sfc_main$o = {
  name: 'MDBNavbarBrand',
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },
  setup(props, { attrs }) {
    const isLink = computed(() => {
      return attrs.href ? 'a' : props.tag
    });

    return {
      isLink,
      props
    }
  }
};

function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($setup.isLink), { class: "navbar-brand" }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }))
}
var MDBNavbarBrand = /*#__PURE__*/_export_sfc(_sfc_main$o, [['render',_sfc_render$o]]);

const _sfc_main$n = {
  name: "MDBNavbarNav",
  components: { MDBCollapse },
  props: {
    tag: {
      type: String,
      default: "ul"
    },
    right: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    },
    justifyAround: {
      type: Boolean,
      default: false
    },
    class: {
      type: String
    },
    nav: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const className = computed(() => {
      return [
        props.nav ? "nav" : "navbar-nav",
        props.right ? "ms-auto" : props.center ? "justify-content-center w-100" : props.vertical ? "flex-column" : props.justifyAround ? "justify-content-around w-100" : "me-auto",
        props.class && `${props.class}`
      ];
    });
    return {
      props,
      className
    };
  }
};
function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]);
}
var MDBNavbarNav = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$n]]);

const _sfc_main$m = {
  name: 'MDBNavbarItem',
  props: {
    tag: {
      type: String,
      default: 'li'
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean
    },
    exact: {
      type: Boolean,
      default: false
    },
    newTab: {
      type: Boolean,
      default: false
    },
    to: [Object, String],
    href: {
      type: String
    },
    linkClass: {
      type: String
    }
  },
  setup(props) {
    const className = computed(() => {
      return ['nav-item', !props.to && !props.href && props.active && 'active']
    });

    const linkClassName = computed(() => {
      return [
        'nav-link',
        props.disabled && 'disabled',
        props.active && 'active',
        props.linkClass
      ]
    });
    const tab = computed(() => {
      if (props.newTab)
        return '_blank'

      return false
    });

    return {
      props,
      className,
      linkClassName,
      tab
    }
  }
};

const _hoisted_1$a = ["href", "target"];

function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");

  return (openBlock(), createBlock(resolveDynamicComponent($setup.props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      ($props.to)
        ? (openBlock(), createBlock(_component_router_link, {
            key: 0,
            class: normalizeClass($setup.linkClassName),
            exact: $props.exact,
            to: $props.to,
            target: $setup.tab
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["class", "exact", "to", "target"]))
        : ($props.href)
          ? (openBlock(), createElementBlock("a", {
              key: 1,
              href: $props.href,
              class: normalizeClass($setup.linkClassName),
              target: $setup.tab
            }, [
              renderSlot(_ctx.$slots, "default")
            ], 10, _hoisted_1$a))
          : renderSlot(_ctx.$slots, "default", { key: 2 })
    ]),
    _: 3
  }, 8, ["class"]))
}
var MDBNavbarItem = /*#__PURE__*/_export_sfc(_sfc_main$m, [['render',_sfc_render$m]]);

const _sfc_main$l = {
  name: 'MDBPagination',
  props: {
    tag: {
      type: String,
      default: 'ul'
    },
    circle: {
      type: Boolean,
      default: false
    },
    lg: {
      type: Boolean,
      default: false
    },
    sm: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const className = computed(() => {
      return [
        'pagination',
        props.sm && 'pagination-sm',
        props.lg && 'pagination-lg',
        props.circle && 'pagination-circle'
      ]
    });

    return {
      className,
      props
    }
  }
};

function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]))
}
var MDBPagination = /*#__PURE__*/_export_sfc(_sfc_main$l, [['render',_sfc_render$l]]);

const _sfc_main$k = {
  name: 'MDBPageNav',
  props: {
    tag: {
      type: String,
      default: 'li'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    href: {
      type: String,
      default: '#'
    },
    prev: {
      type: Boolean,
      default: false
    },
    next: {
      type: Boolean,
      default: false
    },
    icon: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const className = computed(() => {
      return ['page-item', props.disabled && 'disabled']
    });

    const prevValue = computed(() => {
      return props.icon ? '«' : 'Previous'
    });

    const nextValue = computed(() => {
      return props.icon ? '»' : 'Next'
    });

    const disabledTabindex = computed(() => {
      return props.disabled ? '-1' : ' false'
    });

    return {
      className,
      prevValue,
      nextValue,
      disabledTabindex,
      props
    }
  }
};

const _hoisted_1$9 = ["href", "tabindex", "aria-disabled"];
const _hoisted_2$9 = { "aria-hidden": "true" };
const _hoisted_3$6 = /*#__PURE__*/createElementVNode("span", { class: "sr-only" }, "Previous", -1);
const _hoisted_4$4 = ["href", "tabindex", "aria-disabled"];
const _hoisted_5$2 = { "aria-hidden": "true" };
const _hoisted_6$2 = /*#__PURE__*/createElementVNode("span", { class: "sr-only" }, "Next", -1);

function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      ($props.prev)
        ? (openBlock(), createElementBlock("a", {
            key: 0,
            class: "page-link",
            href: $props.href,
            tabindex: $setup.disabledTabindex,
            "aria-disabled": $props.disabled,
            "aria-label": "Previous"
          }, [
            createElementVNode("span", _hoisted_2$9, toDisplayString($setup.prevValue), 1),
            _hoisted_3$6
          ], 8, _hoisted_1$9))
        : createCommentVNode("", true),
      ($props.next)
        ? (openBlock(), createElementBlock("a", {
            key: 1,
            class: "page-link",
            href: $props.href,
            tabindex: $setup.disabledTabindex,
            "aria-disabled": $props.disabled,
            "aria-label": "Next"
          }, [
            createElementVNode("span", _hoisted_5$2, toDisplayString($setup.nextValue), 1),
            _hoisted_6$2
          ], 8, _hoisted_4$4))
        : createCommentVNode("", true)
    ]),
    _: 1
  }, 8, ["class"]))
}
var MDBPageNav = /*#__PURE__*/_export_sfc(_sfc_main$k, [['render',_sfc_render$k]]);

const _sfc_main$j = {
  name: 'MDBPageItem',
  props: {
    tag: {
      type: String,
      default: 'li'
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    href: {
      type: String
    },
    icon: {
      type: Boolean,
      defaul: false
    },
    label: {
      type: String
    }
  },
  setup(props) {
    const className = computed(() => {
      return [
        'page-item',
        props.active && 'active',
        props.disabled && 'disabled'
      ]
    });

    const labelValue = computed(() => {
      return props.icon && props.label ? props.label : props.href
    });

    const disabledTabindex = computed(() => {
      return props.disabled ? '-1' : ' false'
    });

    return {
      className,
      labelValue,
      disabledTabindex,
      props
    }
  }
};

const _hoisted_1$8 = ["href", "aria-label", "aria-disabled", "tabindex"];
const _hoisted_2$8 = {
  key: 0,
  "aria-hidden": "true"
};
const _hoisted_3$5 = {
  key: 1,
  class: "sr-only"
};

function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      createElementVNode("a", {
        class: "page-link",
        href: $props.href,
        "aria-label": $setup.labelValue,
        "aria-disabled": $props.disabled,
        tabindex: $setup.disabledTabindex
      }, [
        ($props.icon)
          ? (openBlock(), createElementBlock("span", _hoisted_2$8, [
              renderSlot(_ctx.$slots, "default")
            ]))
          : createCommentVNode("", true),
        ($props.icon)
          ? (openBlock(), createElementBlock("span", _hoisted_3$5, toDisplayString($setup.labelValue), 1))
          : renderSlot(_ctx.$slots, "default", { key: 2 })
      ], 8, _hoisted_1$8)
    ]),
    _: 3
  }, 8, ["class"]))
}
var MDBPageItem = /*#__PURE__*/_export_sfc(_sfc_main$j, [['render',_sfc_render$j]]);

const _sfc_main$i = {
  name: 'MDBBreadcrumb',
  props: {
    tag: {
      type: String,
      default: 'ol'
    }
  },

  setup(props) {
    const className = computed(() => {
      return ['breadcrumb']
    });

    return {
      className,
      props
    }
  }
};

function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]))
}
var MDBBreadcrumb = /*#__PURE__*/_export_sfc(_sfc_main$i, [['render',_sfc_render$i]]);

const _sfc_main$h = {
  name: 'MDBBreadcrumbItem',
  props: {
    tag: {
      type: String,
      default: 'li'
    },
    active: {
      type: Boolean,
      default: false
    },
    current: {
      type: String,
      default: 'page'
    }
  },
  setup(props) {
    const className = computed(() => {
      return ['breadcrumb-item', props.active && 'active']
    });

    const currentName = computed(() => {
      return props.active && props.current
    });

    return {
      className,
      currentName,
      props
    }
  }
};

function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className),
    "aria-current": $setup.currentName
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class", "aria-current"]))
}
var MDBBreadcrumbItem = /*#__PURE__*/_export_sfc(_sfc_main$h, [['render',_sfc_render$h]]);

const _sfc_main$g = {
  name: 'MDBFooter',
  props: {
    tag: {
      type: String,
      default: 'footer'
    },
    bg: {
      type: String,
      default: 'light'
    },
    text: {
      type: [String, Array]
    }
  },
  setup(props) {
    const className = computed(() => {
      return [
        props.bg && props.bg !== 'none' && `bg-${props.bg}`,
        props.text && spreadProps(props.text)
      ]
    });

    const spreadProps = (props) => {
      if (typeof props === 'string')
        return `text-${props}`

      return props.map(prop => `text-${prop}`.trim()).join(' ')
    };

    return {
      className,
      props
    }
  }
};

function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]))
}
var MDBFooter = /*#__PURE__*/_export_sfc(_sfc_main$g, [['render',_sfc_render$g]]);

const _sfc_main$f = {
  name: 'MDBTabs',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    modelValue: {
      type: String,
      required: true
    },
    vertical: {
      type: [Boolean, String],
      default: false
    }
  },
  emits: ['update:modelValue', 'hide', 'hidden', 'show', 'shown'],
  setup(props, { emit }) {
    const prevTab = ref(null);
    const activeTab = ref(null);
    const activeTabId = ref(props.modelValue);

    watch(
      () => props.modelValue,
      (cur) => {
        if (cur !== activeTabId.value) {
          activeTabId.value = cur;
          updateActiveTab(null, cur);
        }
      }
    );

    const updateActiveTab = (element, tabId) => {
      if (!element)
        element = document.body.querySelector(`#tab-${tabId}`);

      if (prevTab.value)
        emit('hide', { target: prevTab.value, relatedTarget: element });

      emit('show', { target: element, relatedTarget: prevTab.value });
      emit('update:modelValue', tabId);

      activeTab.value = element;
      activeTabId.value = tabId;
    };

    const emitShown = () => {
      emit('shown', { target: activeTab.value, relatedTarget: prevTab.value });
      prevTab.value = activeTab.value;
    };

    const emitHidden = () => {
      emit('hidden', {
        target: prevTab.value,
        relatedTarget: activeTab.value
      });
    };

    provide('activeTab', activeTabId);
    provide('updateActiveTab', updateActiveTab);
    provide('emitShown', emitShown);
    provide('emitHidden', emitHidden);

    const isVertical = ref(false);
    const windowWidth = ref(0);
    const activeBrakpointValue = ref(null);

    provide('isVertical', isVertical);

    const handleWindowResize = () => {
      windowWidth.value = window.innerWidth;

      const breakpointValue = handleBreakpoints(windowWidth.value, [
        'column',
        props.vertical
      ]);

      if (breakpointValue === activeBrakpointValue.value) return

      isVertical.value = breakpointValue === props.vertical;
      activeBrakpointValue.value = breakpointValue;
    };

    onMounted(() => {
      windowWidth.value = window.innerWidth;

      if (!props.vertical) return

      if (props.vertical === true) {
        isVertical.value = true;
      }
      else {
        handleWindowResize();
        on(window, 'resize', handleWindowResize);
      }
    });

    onUnmounted(() => {
      off(window, 'resize', handleWindowResize);
    });

    return {
      isVertical,
      props
    }
  }
};

function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
  return ($setup.isVertical)
    ? (openBlock(), createBlock(resolveDynamicComponent($props.tag), mergeProps({
        key: 0,
        class: "row"
      }, _ctx.$attrs), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16))
    : renderSlot(_ctx.$slots, "default", { key: 1 })
}
var MDBTabs = /*#__PURE__*/_export_sfc(_sfc_main$f, [['render',_sfc_render$f]]);

const _sfc_main$e = {
  name: 'MDBTabNav',
  props: {
    tag: {
      type: String,
      default: 'ul'
    },
    pills: {
      type: Boolean
    },
    justify: {
      type: Boolean
    },
    fill: {
      type: Boolean
    },
    col: {
      type: String,
      default: '3'
    },
    tabsClasses: String
  },
  setup(props) {
    const className = computed(() => {
      return [
        'nav',
        props.pills ? 'nav-pills' : 'nav-tabs',
        props.justify && 'nav-justified',
        props.fill && 'nav-fill',
        isVertical.value && 'flex-column',
        props.tabsClasses && props.tabsClasses
      ]
    });

    const columnClassName = computed(() => {
      return [`col-${props.col}`]
    });

    const isVertical = inject('isVertical', false);

    return {
      className,
      columnClassName,
      isVertical,
      props
    }
  }
};

function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
  return ($setup.isVertical)
    ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass($setup.columnClassName)
      }, [
        (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
          class: normalizeClass($setup.className)
        }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        }, 8, ["class"]))
      ], 2))
    : (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
        key: 1,
        class: normalizeClass($setup.className)
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["class"]))
}
var MDBTabNav = /*#__PURE__*/_export_sfc(_sfc_main$e, [['render',_sfc_render$e]]);

const _sfc_main$d = {
  name: 'MDBTabItem',
  inheritAttrs: false,
  props: {
    tag: {
      type: String,
      default: 'a'
    },
    tabId: {
      type: String,
      required: true
    },
    href: String
  },
  setup(props) {
    const item = ref('item');

    const className = computed(() => {
      return ['nav-link', isActive.value && 'active']
    });

    const uid = computed(() => {
      return `tab-${props.tabId}`
    });
    const controls = computed(() => {
      return `${props.tabId}`
    });

    const activeTabId = inject('activeTab', false);
    const isActive = ref(
      activeTabId
        && (activeTabId.value === props.tabId
          || (activeTabId && activeTabId === props.tabId))
    );

    const updateActiveTab = inject('updateActiveTab', false);
    watchEffect(
      () =>
        (isActive.value
          = activeTabId
          && (activeTabId.value === props.tabId
            || (activeTabId && activeTabId === props.tabId)))
    );

    const handleClick = () => {
      updateActiveTab(item.value, props.tabId);
    };

    onMounted(() => {
      if (isActive.value && updateActiveTab)
        updateActiveTab(item.value, props.tabId);
    });

    return {
      item,
      uid,
      controls,
      className,
      handleClick,
      props
    }
  }
};

const _hoisted_1$7 = {
  key: 0,
  class: "nav-item",
  role: "presentation"
};
const _hoisted_2$7 = ["id", "aria-controls", "href"];

function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
  return ($props.href)
    ? (openBlock(), createElementBlock("li", _hoisted_1$7, [
        createElementVNode("a", mergeProps({ id: $setup.uid }, _ctx.$attrs, {
          ref: "item",
          class: $setup.className,
          role: "tab",
          "aria-controls": $setup.controls,
          href: $props.href,
          onClick: _cache[0] || (_cache[0] = withModifiers($event => ($setup.handleClick($props.tabId)), ["prevent"]))
        }), [
          renderSlot(_ctx.$slots, "default")
        ], 16, _hoisted_2$7)
      ]))
    : (openBlock(), createBlock(resolveDynamicComponent($props.tag), mergeProps({
        key: 1,
        id: $setup.uid
      }, _ctx.$attrs, {
        ref: "item",
        class: $setup.className,
        role: "tab",
        "aria-controls": $setup.controls,
        onClick: _cache[1] || (_cache[1] = withModifiers($event => ($setup.handleClick($props.tabId)), ["prevent"]))
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["id", "class", "aria-controls"]))
}
var MDBTabItem = /*#__PURE__*/_export_sfc(_sfc_main$d, [['render',_sfc_render$d]]);

const _sfc_main$c = {
  name: 'MDBTabPane',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    tabId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const className = computed(() => {
      return ['tab-pane fade', isActive.value && 'show active']
    });

    const item = ref('item');
    const uid = computed(() => {
      return `${props.tabId}`
    });
    const labelledby = computed(() => {
      return `tab-${props.tabId}`
    });

    const activeTabId = inject('activeTab', false);
    const isActive = ref(
      activeTabId
        && (activeTabId.value === props.tabId || activeTabId === props.tabId)
    );

    watchEffect(
      () =>
        (isActive.value
          = activeTabId
          && (activeTabId.value === props.tabId || activeTabId === props.tabId))
    );

    const emitShown = inject('emitShown', false);
    const emitHidden = inject('emitHidden', false);

    onMounted(() => {
      if (isActive.value && emitShown)
        emitShown(props.tabId);
    });

    const afterEnter = (el) => {
      el.style.opacity = '1';
    };
    const enter = (el) => {
      el.style.opacity = '0';
      emitShown(props.tabId);
    };
    const beforeLeave = (el) => {
      el.style.opacity = '1';
      emitHidden(props.tabId);
    };
    const afterLeave = (el) => {
      el.style.opacity = '0';
    };

    return {
      isActive,
      item,
      uid,
      labelledby,
      afterEnter,
      enter,
      beforeLeave,
      afterLeave,
      className,
      props
    }
  }
};

function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(Transition, {
    duration: 150,
    onEnter: $setup.enter,
    onAfterEnter: $setup.afterEnter,
    onBeforeLeave: $setup.beforeLeave,
    onAfterLeave: $setup.afterLeave
  }, {
    default: withCtx(() => [
      withDirectives((openBlock(), createBlock(resolveDynamicComponent($props.tag), {
        id: $setup.uid,
        ref: "item",
        class: normalizeClass($setup.className),
        role: "tabpanel",
        "aria-labelledby": $setup.labelledby
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["id", "class", "aria-labelledby"])), [
        [vShow, $setup.isActive]
      ])
    ]),
    _: 3
  }, 8, ["onEnter", "onAfterEnter", "onBeforeLeave", "onAfterLeave"]))
}
var MDBTabPane = /*#__PURE__*/_export_sfc(_sfc_main$c, [['render',_sfc_render$c]]);

const _sfc_main$b = {
  name: 'MDBTabContent',
  inheritAttrs: false,
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    col: {
      type: String,
      default: '9'
    },
    contentClasses: String
  },
  setup(props) {
    const className = computed(() => {
      return ['tab-content', props.contentClasses && props.contentClasses]
    });

    const columnClassName = computed(() => {
      return [`col-${props.col}`]
    });

    const isVertical = inject('isVertical', false);

    return {
      isVertical,
      className,
      columnClassName,
      props
    }
  }
};

function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(KeepAlive, null, [
    ($setup.isVertical)
      ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass($setup.columnClassName)
        }, [
          (openBlock(), createBlock(resolveDynamicComponent($props.tag), mergeProps({ class: $setup.className }, _ctx.$attrs), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16, ["class"]))
        ], 2))
      : (openBlock(), createBlock(resolveDynamicComponent($props.tag), mergeProps({
          key: 1,
          class: $setup.className
        }, _ctx.$attrs), {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        }, 16, ["class"]))
  ], 1024))
}
var MDBTabContent = /*#__PURE__*/_export_sfc(_sfc_main$b, [['render',_sfc_render$b]]);

const _sfc_main$a = {
  name: 'MDBCol',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    col: {
      type: String
    },
    sm: {
      type: String
    },
    md: {
      type: String
    },
    lg: {
      type: String
    },
    xl: {
      type: String
    },
    offset: {
      type: String
    },
    offsetSm: {
      type: String
    },
    offsetMd: {
      type: String
    },
    offsetLg: {
      type: String
    },
    offsetXl: {
      type: String
    },
    auto: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const className = computed(() => {
      return [
        props.col ? `col-${props.col}` : '',
        props.sm ? `col-sm-${props.sm}` : '',
        props.md ? `col-md-${props.md}` : '',
        props.lg ? `col-lg-${props.lg}` : '',
        props.xl ? `col-xl-${props.xl}` : '',
        !props.col && !props.sm && !props.md && !props.lg && !props.xl
          ? 'col'
          : '',
        props.offset ? `offset-${props.offset}` : '',
        props.offsetSm ? `offset-sm-${props.offsetSm}` : '',
        props.offsetMd ? `offset-md-${props.offsetMd}` : '',
        props.offsetLg ? `offset-lg-${props.offsetLg}` : '',
        props.offsetXl ? `offset-xl-${props.offsetXl}` : '',
        props.auto ? 'col-auto' : ''
      ]
    });

    return {
      className,
      props
    }
  }
};

function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]))
}
var MDBCol = /*#__PURE__*/_export_sfc(_sfc_main$a, [['render',_sfc_render$a]]);

const _sfc_main$9 = {
  name: 'MDBRow',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    start: {
      type: Boolean,
      default: false
    },
    end: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    },
    between: {
      type: Boolean,
      default: false
    },
    around: {
      type: Boolean,
      default: false
    },
    cols: {
      type: [String, Array]
    }
  },
  setup(props) {
    const className = computed(() => {
      return [
        'row',
        props.cols ? `${spreadProps(props.cols)}` : '',
        props.start && 'justify-content-start',
        props.end && 'justify-content-end',
        props.center && 'justify-content-center',
        props.between && 'justify-content-between',
        props.around && 'justify-content-around'
      ]
    });

    const spreadProps = (props) => {
      if (typeof props === 'string')
        return `row-cols-${props}`

      return props.map(prop => `row-cols-${prop}`.trim()).join(' ')
    };

    return {
      className,
      props
    }
  }
};

function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]))
}
var MDBRow = /*#__PURE__*/_export_sfc(_sfc_main$9, [['render',_sfc_render$9]]);

const _sfc_main$8 = {
  name: 'MDBContainer',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    sm: {
      type: Boolean,
      default: false
    },
    md: {
      type: Boolean,
      default: false
    },
    lg: {
      type: Boolean,
      default: false
    },
    xl: {
      type: Boolean,
      default: false
    },
    xxl: {
      type: Boolean,
      default: false
    },
    fluid: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const className = computed(() => {
      return [
        props.fluid ? 'container-fluid' : '',
        props.sm ? 'container-sm' : '',
        props.md ? 'container-md' : '',
        props.lg ? 'container-lg' : '',
        props.xl ? 'container-xl' : '',
        props.xxl ? 'container-xxl' : '',
        !props.fluid
        && !props.sm
        && !props.md
        && !props.lg
        && !props.xl
        && !props.xxl
          ? 'container'
          : ''
      ]
    });

    return {
      className,
      props
    }
  }
};

function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]))
}
var MDBContainer = /*#__PURE__*/_export_sfc(_sfc_main$8, [['render',_sfc_render$8]]);

const _sfc_main$7 = {
  name: 'MDBTable',
  inheritAttrs: false,
  props: {
    tag: {
      type: String,
      default: 'table'
    },
    variant: {
      type: String
    },
    dark: {
      type: Boolean,
      default: false
    },
    light: {
      type: Boolean,
      default: false
    },
    border: {
      type: [Boolean, String],
      default: false
    },
    borderless: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    hover: {
      type: Boolean,
      default: false
    },
    responsive: {
      type: [Boolean, String],
      default: false
    },
    align: {
      type: String
    },
    sm: {
      type: Boolean,
      default: false
    },
    tableStyle: {
      type: String
    },
    captionTop: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const wrapperClasses = computed(() => {
      if (!props.responsive)
        return false

      return props.responsive !== true
        ? `table-responsive-${props.responsive}`
        : 'table-responsive'
    });

    const borderClass = computed(() => {
      if (!props.border)
        return ''

      return props.border !== true
        ? `table-bordered border-${props.border}`
        : 'table-bordered'
    });

    const tableClasses = computed(() => {
      return [
        'table',
        props.dark && 'table-dark',
        props.light && 'table-light',
        props.variant && `table-${props.variant}`,
        props.striped && 'table-striped',
        borderClass.value,
        props.borderless && 'table-borderless',
        props.hover && 'table-hover',
        props.sm && 'table-sm',
        props.align && props.align === 'top'
          ? 'align-top'
          : props.align === 'bottom'
            ? 'align-bottom'
            : props.align === 'middle'
              ? 'align-middle'
              : '',
        props.captionTop && 'caption-top',
        props.tableStyle
      ]
    });

    return {
      wrapperClasses,
      tableClasses,
      props
    }
  }
};

function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return ($props.responsive)
    ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass($setup.wrapperClasses)
      }, [
        (openBlock(), createBlock(resolveDynamicComponent($props.tag), mergeProps({
          class: $setup.tableClasses,
          style: $props.tableStyle
        }, _ctx.$attrs), {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        }, 16, ["class", "style"]))
      ], 2))
    : (openBlock(), createBlock(resolveDynamicComponent($props.tag), mergeProps({
        key: 1,
        class: $setup.tableClasses,
        style: $props.tableStyle
      }, _ctx.$attrs), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["class", "style"]))
}
var MDBTable = /*#__PURE__*/_export_sfc(_sfc_main$7, [['render',_sfc_render$7]]);

const _sfc_main$6 = {
  name: 'MDBInput',
  directives: { mdbClickOutside },
  inheritAttrs: false,
  props: {
    id: String,
    label: String,
    labelClass: String,
    modelValue: [String, Number, Date],
    size: String,
    formOutline: {
      type: Boolean,
      default: true
    },
    wrapperClass: String,
    inputGroup: {
      type: [Boolean, String],
      default: false
    },
    wrap: {
      type: Boolean,
      default: true
    },
    formText: String,
    white: Boolean,
    validationEvent: String,
    isValidated: Boolean,
    isValid: Boolean,
    validFeedback: String,
    invalidFeedback: String,
    tooltipFeedback: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: 'div'
    },
    helper: String,
    counter: Boolean,
    maxlength: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:modelValue', 'click-outside'],
  setup(props, { attrs, emit }) {
    const inputRef = ref('inputRef');
    const inputValue = ref(props.modelValue);
    const labelRef = ref(null);
    const showPlaceholder = ref(false);
    const notchLeadingWidth = ref(9);
    const notchMiddleWidth = ref(0);
    const uid = props.id || getUID('MDBInput-');

    const wrapperClassName = computed(() => {
      return [
        props.formOutline && 'form-outline',
        inputGroupClassName.value,
        props.white && 'form-white',
        props.wrapperClass
      ]
    });
    const inputClassName = computed(() => {
      return [
        'form-control',
        props.size && `form-control-${props.size}`,
        inputValue.value && 'active',
        showPlaceholder.value && 'placeholder-active',
        isInputValidated.value && isInputValid.value && 'is-valid',
        isInputValidated.value && !isInputValid.value && 'is-invalid'
      ]
    });
    const labelClassName = computed(() => {
      return ['form-label', props.labelClass]
    });

    const inputGroupClassName = computed(() => {
      if (!props.inputGroup)
        return

      return props.inputGroup !== true
        ? `input-group input-group-${props.inputGroup}`
        : 'input-group'
    });

    const validationStyle = computed(() => {
      return props.inputGroup && isInputValidated.value
        ? { marginBottom: '1rem' }
        : ''
    });

    const validFeedbackClassName = computed(() => {
      return props.tooltipFeedback ? 'valid-tooltip' : 'valid-feedback'
    });

    const invalidFeedbackClassName = computed(() => {
      return props.tooltipFeedback ? 'invalid-tooltip' : 'invalid-feedback'
    });

    // Validation ------------------------
    const isInputValidated = ref(props.isValidated);
    const isInputValid = ref(props.isValid);
    const defaultValidatorInvalidFeedback = ref('');
    const customInvalidFeedback = computed(() => {
      if (
        isInputValidated.value
        && !isInputValid.value
        && props.validationEvent
      )
        return defaultValidatorInvalidFeedback.value

      return props.invalidFeedback
    });

    const handleValidation = (e) => {
      isInputValid.value = e.target.checkValidity();
      if (!isInputValid.value)
        defaultValidatorInvalidFeedback.value = e.target.validationMessage;

      isInputValidated.value = true;
    };

    const bindValidationEvents = () => {
      if (props.validationEvent === 'submit') return
      on(inputRef.value, props.validationEvent, handleValidation);
    };

    function calcNotch() {
      if (labelRef.value)
        notchMiddleWidth.value = labelRef.value.clientWidth * 0.8 + 8;
    }

    function setPlaceholder() {
      if (attrs.placeholder && !labelRef.value)
        showPlaceholder.value = true;
      else
        showPlaceholder.value = false;
    }

    const currentLength = ref(0);

    function handleInput(e) {
      if (props.counter) {
        if (e.target.value.length > props.maxlength) {
          e.target.value = inputValue.value;
          return
        }

        currentLength.value = e.target.value.length;
      }
      inputValue.value = e.target.value;
      emit('update:modelValue', inputValue.value);
    }

    function clickOutside() {
      emit('click-outside');
    }

    onMounted(() => {
      calcNotch();
      setPlaceholder();

      if (props.validationEvent)
        bindValidationEvents();
    });

    onUpdated(() => {
      calcNotch();
      setPlaceholder();
    });

    onUnmounted(() => {
      off(inputRef.value, props.validationEvent, handleValidation);
    });

    watchEffect(() => {
      inputValue.value = props.modelValue;
    });

    watch(
      () => props.isValidated,
      value => (isInputValidated.value = value)
    );

    watch(
      () => props.isValid,
      value => (isInputValid.value = value)
    );

    return {
      inputRef,
      uid,
      inputValue,
      labelRef,
      handleInput,
      wrapperClassName,
      inputClassName,
      labelClassName,
      validFeedbackClassName,
      invalidFeedbackClassName,
      validationStyle,
      customInvalidFeedback,
      notchLeadingWidth,
      notchMiddleWidth,
      clickOutside,
      props,
      currentLength
    }
  }
};

const _hoisted_1$6 = ["id", "value"];
const _hoisted_2$6 = ["for"];
const _hoisted_3$4 = {
  key: 2,
  class: "form-helper"
};
const _hoisted_4$3 = {
  key: 3,
  class: "form-helper"
};
const _hoisted_5$1 = { class: "form-counter" };
const _hoisted_6$1 = {
  key: 7,
  class: "form-notch"
};
const _hoisted_7$1 = /*#__PURE__*/createElementVNode("div", { class: "form-notch-trailing" }, null, -1);
const _hoisted_8$1 = ["id", "value"];
const _hoisted_9$1 = ["for"];
const _hoisted_10$1 = {
  key: 1,
  class: "form-helper"
};
const _hoisted_11$1 = {
  key: 2,
  class: "form-helper"
};
const _hoisted_12$1 = { class: "form-counter" };
const _hoisted_13$1 = {
  key: 5,
  class: "form-notch"
};
const _hoisted_14 = /*#__PURE__*/createElementVNode("div", { class: "form-notch-trailing" }, null, -1);
const _hoisted_15 = {
  key: 9,
  class: "form-text"
};

function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_mdb_click_outside = resolveDirective("mdb-click-outside");

  return (openBlock(), createElementBlock(Fragment, null, [
    (!$props.wrap)
      ? withDirectives((openBlock(), createElementBlock("input", mergeProps({
          key: 0,
          id: $setup.uid
        }, _ctx.$attrs, {
          ref: "inputRef",
          class: $setup.inputClassName,
          value: $setup.inputValue,
          onInput: _cache[0] || (_cache[0] = (...args) => ($setup.handleInput && $setup.handleInput(...args)))
        }), null, 16, _hoisted_1$6)), [
          [_directive_mdb_click_outside, $setup.clickOutside]
        ])
      : createCommentVNode("", true),
    ($props.label && !$props.wrap)
      ? (openBlock(), createElementBlock("label", {
          key: 1,
          ref: "labelRef",
          class: normalizeClass($setup.labelClassName),
          for: $setup.uid
        }, toDisplayString($props.label), 11, _hoisted_2$6))
      : createCommentVNode("", true),
    (!$props.wrap && $props.helper)
      ? (openBlock(), createElementBlock("div", _hoisted_3$4, toDisplayString($props.helper), 1))
      : createCommentVNode("", true),
    (!$props.wrap && $props.counter)
      ? (openBlock(), createElementBlock("div", _hoisted_4$3, [
          createElementVNode("div", _hoisted_5$1, toDisplayString($setup.currentLength) + " / " + toDisplayString($props.maxlength), 1)
        ]))
      : createCommentVNode("", true),
    (!$props.wrap)
      ? renderSlot(_ctx.$slots, "default", { key: 4 })
      : createCommentVNode("", true),
    (!$props.wrap && $props.validFeedback)
      ? (openBlock(), createElementBlock("div", {
          key: 5,
          class: normalizeClass($setup.validFeedbackClassName)
        }, toDisplayString($props.validFeedback), 3))
      : createCommentVNode("", true),
    (!$props.wrap && $setup.customInvalidFeedback)
      ? (openBlock(), createElementBlock("div", {
          key: 6,
          class: normalizeClass($setup.invalidFeedbackClassName)
        }, toDisplayString($setup.customInvalidFeedback), 3))
      : createCommentVNode("", true),
    (!$props.wrap && $props.formOutline)
      ? (openBlock(), createElementBlock("div", _hoisted_6$1, [
          createElementVNode("div", {
            class: "form-notch-leading",
            style: normalizeStyle({ width: `${$setup.notchLeadingWidth}px` })
          }, null, 4),
          createElementVNode("div", {
            class: "form-notch-middle",
            style: normalizeStyle({ width: `${$setup.notchMiddleWidth}px` })
          }, null, 4),
          _hoisted_7$1
        ]))
      : createCommentVNode("", true),
    ($props.wrap)
      ? withDirectives((openBlock(), createBlock(resolveDynamicComponent($props.tag), {
          key: 8,
          class: normalizeClass($setup.wrapperClassName),
          style: normalizeStyle($setup.validationStyle)
        }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "prepend"),
            createElementVNode("input", mergeProps(_ctx.$attrs, {
              id: $setup.uid,
              ref: "inputRef",
              class: $setup.inputClassName,
              value: $setup.inputValue,
              onInput: _cache[1] || (_cache[1] = (...args) => ($setup.handleInput && $setup.handleInput(...args)))
            }), null, 16, _hoisted_8$1),
            ($props.label)
              ? (openBlock(), createElementBlock("label", {
                  key: 0,
                  ref: "labelRef",
                  class: normalizeClass($setup.labelClassName),
                  for: $setup.uid
                }, toDisplayString($props.label), 11, _hoisted_9$1))
              : createCommentVNode("", true),
            ($props.helper)
              ? (openBlock(), createElementBlock("div", _hoisted_10$1, toDisplayString($props.helper), 1))
              : createCommentVNode("", true),
            ($props.counter)
              ? (openBlock(), createElementBlock("div", _hoisted_11$1, [
                  createElementVNode("div", _hoisted_12$1, toDisplayString($setup.currentLength) + " / " + toDisplayString($props.maxlength), 1)
                ]))
              : createCommentVNode("", true),
            renderSlot(_ctx.$slots, "default"),
            ($props.validFeedback)
              ? (openBlock(), createElementBlock("div", {
                  key: 3,
                  class: normalizeClass($setup.validFeedbackClassName)
                }, toDisplayString($props.validFeedback), 3))
              : createCommentVNode("", true),
            ($setup.customInvalidFeedback)
              ? (openBlock(), createElementBlock("div", {
                  key: 4,
                  class: normalizeClass($setup.invalidFeedbackClassName)
                }, toDisplayString($setup.customInvalidFeedback), 3))
              : createCommentVNode("", true),
            ($props.formOutline)
              ? (openBlock(), createElementBlock("div", _hoisted_13$1, [
                  createElementVNode("div", {
                    class: "form-notch-leading",
                    style: normalizeStyle({ width: `${$setup.notchLeadingWidth}px` })
                  }, null, 4),
                  createElementVNode("div", {
                    class: "form-notch-middle",
                    style: normalizeStyle({ width: `${$setup.notchMiddleWidth}px` })
                  }, null, 4),
                  _hoisted_14
                ]))
              : createCommentVNode("", true)
          ]),
          _: 3
        }, 8, ["class", "style"])), [
          [_directive_mdb_click_outside, $setup.clickOutside]
        ])
      : createCommentVNode("", true),
    ($props.formText)
      ? (openBlock(), createElementBlock("div", _hoisted_15, toDisplayString($props.formText), 1))
      : createCommentVNode("", true)
  ], 64))
}
var MDBInput = /*#__PURE__*/_export_sfc(_sfc_main$6, [['render',_sfc_render$6]]);

const _sfc_main$5 = {
  name: 'MDBTextarea',
  inheritAttrs: false,
  props: {
    id: String,
    rows: {
      type: [String, Number],
      default: 4
    },
    label: String,
    modelValue: [String, Number],
    size: String,
    formOutline: {
      type: Boolean,
      default: true
    },
    wrapperClass: String,
    inputGroup: {
      type: [Boolean, String],
      default: false
    },
    wrap: {
      type: Boolean,
      default: true
    },
    formText: String,
    white: Boolean,
    validationEvent: String,
    isValidated: Boolean,
    isValid: Boolean,
    validFeedback: String,
    invalidFeedback: String,
    tooltipFeedback: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: 'div'
    },
    helper: String,
    counter: Boolean,
    maxLength: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit }) {
    const textareaRef = ref('textareaRef');
    const textareaValue = ref(props.modelValue);
    const labelRef = ref(null);
    const showPlaceholder = ref(false);
    const notchLeadingWidth = ref(9);
    const notchMiddleWidth = ref(0);
    const uid = props.id || getUID('MDBTextarea-');

    const wrapperClassName = computed(() => {
      return [
        props.formOutline && 'form-outline',
        inputGroupClassName.value,
        props.white && 'form-white',
        props.wrapperClass
      ]
    });
    const textareaClassName = computed(() => {
      return [
        'form-control',
        props.size && `form-control-${props.size}`,
        textareaValue.value && 'active',
        showPlaceholder.value && 'placeholder-active',
        isInputValidated.value && isInputValid.value && 'is-valid',
        isInputValidated.value && !isInputValid.value && 'is-invalid'
      ]
    });

    const inputGroupClassName = computed(() => {
      if (!props.inputGroup)
        return

      return props.inputGroup !== true
        ? `input-group input-group-${props.inputGroup}`
        : 'input-group'
    });

    const validationStyle = computed(() => {
      return props.inputGroup && isInputValidated.value
        ? { marginBottom: '1rem' }
        : ''
    });

    const validFeedbackClassName = computed(() => {
      return props.tooltipFeedback ? 'valid-tooltip' : 'valid-feedback'
    });

    const invalidFeedbackClassName = computed(() => {
      return props.tooltipFeedback ? 'invalid-tooltip' : 'invalid-feedback'
    });

    // Validation ------------------------
    const isInputValidated = ref(props.isValidated);
    const isInputValid = ref(props.isValid);
    const defaultValidatorInvalidFeedback = ref('');
    const customInvalidFeedback = computed(() => {
      if (
        isInputValidated.value
        && !isInputValid.value
        && props.validationEvent
      )
        return defaultValidatorInvalidFeedback.value

      return props.invalidFeedback
    });

    const handleValidation = (e) => {
      isInputValid.value = e.target.checkValidity();
      if (!isInputValid.value)
        defaultValidatorInvalidFeedback.value = e.target.validationMessage;

      isInputValidated.value = true;
    };

    const bindValidationEvents = () => {
      if (props.validationEvent === 'submit') return
      on(textareaRef.value, props.validationEvent, handleValidation);
    };

    function calcNotch() {
      if (labelRef.value)
        notchMiddleWidth.value = labelRef.value.clientWidth * 0.8 + 8;
    }

    function setPlaceholder() {
      if (attrs.placeholder && !labelRef.value)
        showPlaceholder.value = true;
      else
        showPlaceholder.value = false;
    }

    const currentLength = ref(0);

    function handleInput(e) {
      if (props.counter) {
        if (e.target.value.length > props.maxLength) {
          e.target.value = textareaValue.value;
          return
        }

        currentLength.value = e.target.value.length;
      }

      textareaValue.value = e.target.value;
      emit('update:modelValue', textareaValue.value);
    }

    onMounted(() => {
      calcNotch();
      setPlaceholder();

      if (props.validationEvent)
        bindValidationEvents();
    });

    onUpdated(() => {
      calcNotch();
      setPlaceholder();
    });

    onUnmounted(() => {
      off(textareaRef.value, props.validationEvent, handleValidation);
    });

    watchEffect(() => (textareaValue.value = props.modelValue));

    return {
      textareaRef,
      uid,
      textareaValue,
      labelRef,
      handleInput,
      wrapperClassName,
      textareaClassName,
      validFeedbackClassName,
      invalidFeedbackClassName,
      validationStyle,
      customInvalidFeedback,
      notchLeadingWidth,
      notchMiddleWidth,
      props,
      currentLength
    }
  }
};

const _hoisted_1$5 = ["id", "value", "rows"];
const _hoisted_2$5 = ["for"];
const _hoisted_3$3 = {
  key: 2,
  class: "form-helper"
};
const _hoisted_4$2 = {
  key: 3,
  class: "form-helper"
};
const _hoisted_5 = { class: "form-counter" };
const _hoisted_6 = ["id", "value", "rows"];
const _hoisted_7 = ["for"];
const _hoisted_8 = {
  key: 1,
  class: "form-helper"
};
const _hoisted_9 = {
  key: 2,
  class: "form-helper"
};
const _hoisted_10 = { class: "form-counter" };
const _hoisted_11 = {
  key: 5,
  class: "form-notch"
};
const _hoisted_12 = /*#__PURE__*/createElementVNode("div", { class: "form-notch-trailing" }, null, -1);
const _hoisted_13 = {
  key: 8,
  class: "form-text"
};

function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock(Fragment, null, [
    (!$props.wrap)
      ? (openBlock(), createElementBlock("textarea", mergeProps({ key: 0 }, _ctx.$attrs, {
          id: $setup.uid,
          ref: "textareaRef",
          class: $setup.textareaClassName,
          value: $setup.textareaValue,
          rows: $props.rows,
          onInput: _cache[0] || (_cache[0] = (...args) => ($setup.handleInput && $setup.handleInput(...args)))
        }), null, 16, _hoisted_1$5))
      : createCommentVNode("", true),
    ($props.label && !$props.wrap)
      ? (openBlock(), createElementBlock("label", {
          key: 1,
          ref: "labelRef",
          class: "form-label",
          for: $setup.uid
        }, toDisplayString($props.label), 9, _hoisted_2$5))
      : createCommentVNode("", true),
    (!$props.wrap && $props.helper)
      ? (openBlock(), createElementBlock("div", _hoisted_3$3, toDisplayString($props.helper), 1))
      : createCommentVNode("", true),
    (!$props.wrap && $props.counter)
      ? (openBlock(), createElementBlock("div", _hoisted_4$2, [
          createElementVNode("div", _hoisted_5, toDisplayString($setup.currentLength) + " / " + toDisplayString($props.maxLength), 1)
        ]))
      : createCommentVNode("", true),
    (!$props.wrap)
      ? renderSlot(_ctx.$slots, "default", { key: 4 })
      : createCommentVNode("", true),
    (!$props.wrap && $props.validFeedback)
      ? (openBlock(), createElementBlock("div", {
          key: 5,
          class: normalizeClass($setup.validFeedbackClassName)
        }, toDisplayString($props.validFeedback), 3))
      : createCommentVNode("", true),
    (!$props.wrap && $setup.customInvalidFeedback)
      ? (openBlock(), createElementBlock("div", {
          key: 6,
          class: normalizeClass($setup.invalidFeedbackClassName)
        }, toDisplayString($setup.customInvalidFeedback), 3))
      : createCommentVNode("", true),
    ($props.wrap)
      ? (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
          key: 7,
          class: normalizeClass($setup.wrapperClassName),
          style: normalizeStyle($setup.validationStyle)
        }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "prepend"),
            createElementVNode("textarea", mergeProps(_ctx.$attrs, {
              id: $setup.uid,
              ref: "textareaRef",
              class: $setup.textareaClassName,
              value: $setup.textareaValue,
              rows: $props.rows,
              onInput: _cache[1] || (_cache[1] = (...args) => ($setup.handleInput && $setup.handleInput(...args)))
            }), null, 16, _hoisted_6),
            ($props.label)
              ? (openBlock(), createElementBlock("label", {
                  key: 0,
                  ref: "labelRef",
                  class: "form-label",
                  for: $setup.uid
                }, toDisplayString($props.label), 9, _hoisted_7))
              : createCommentVNode("", true),
            ($props.helper)
              ? (openBlock(), createElementBlock("div", _hoisted_8, toDisplayString($props.helper), 1))
              : createCommentVNode("", true),
            ($props.counter)
              ? (openBlock(), createElementBlock("div", _hoisted_9, [
                  createElementVNode("div", _hoisted_10, toDisplayString($setup.currentLength) + " / " + toDisplayString($props.maxLength), 1)
                ]))
              : createCommentVNode("", true),
            ($props.validFeedback)
              ? (openBlock(), createElementBlock("div", {
                  key: 3,
                  class: normalizeClass($setup.validFeedbackClassName)
                }, toDisplayString($props.validFeedback), 3))
              : createCommentVNode("", true),
            ($setup.customInvalidFeedback)
              ? (openBlock(), createElementBlock("div", {
                  key: 4,
                  class: normalizeClass($setup.invalidFeedbackClassName)
                }, toDisplayString($setup.customInvalidFeedback), 3))
              : createCommentVNode("", true),
            ($props.formOutline)
              ? (openBlock(), createElementBlock("div", _hoisted_11, [
                  createElementVNode("div", {
                    class: "form-notch-leading",
                    style: normalizeStyle({ width: `${$setup.notchLeadingWidth}px` })
                  }, null, 4),
                  createElementVNode("div", {
                    class: "form-notch-middle",
                    style: normalizeStyle({ width: `${$setup.notchMiddleWidth}px` })
                  }, null, 4),
                  _hoisted_12
                ]))
              : createCommentVNode("", true)
          ]),
          _: 3
        }, 8, ["class", "style"]))
      : createCommentVNode("", true),
    ($props.formText)
      ? (openBlock(), createElementBlock("div", _hoisted_13, toDisplayString($props.formText), 1))
      : createCommentVNode("", true)
  ], 64))
}
var MDBTextarea = /*#__PURE__*/_export_sfc(_sfc_main$5, [['render',_sfc_render$5]]);

const _sfc_main$4 = {
  name: 'MDBCheckbox',
  inheritAttrs: false,
  props: {
    id: String,
    label: String,
    modelValue: Boolean,
    inline: Boolean,
    wrapperClass: String,
    labelClass: String,
    inputClass: String,
    btnCheck: Boolean,
    required: Boolean,
    validateOnChange: Boolean,
    isValidated: Boolean,
    isValid: Boolean,
    validFeedback: String,
    invalidFeedback: String,
    tooltipFeedback: {
      type: Boolean,
      default: false
    },
    wrap: {
      type: Boolean,
      default: true
    },
    formCheck: {
      type: Boolean,
      default: true
    },
    tag: {
      type: String,
      default: 'div'
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const inputRef = ref('inputRef');
    const inputValue = ref(props.modelValue);
    const uid = props.id || getUID('MDBCheckbox-');

    const wrapperClassName = computed(() => {
      return [
        props.formCheck && !props.btnCheck ? 'form-check' : '',
        props.inline && 'form-check-inline',
        props.wrapperClass
      ]
    });
    const inputClassName = computed(() => {
      return [
        props.btnCheck ? 'btn-check' : 'form-check-input',
        props.inputClass && props.inputClass,
        isInputValidated.value && isInputValid.value && 'is-valid',
        isInputValidated.value && !isInputValid.value && 'is-invalid'
      ]
    });
    const labelClassName = computed(() => {
      return [props.labelClass || 'form-check-label']
    });

    const validFeedbackClassName = computed(() => {
      return props.tooltipFeedback ? 'valid-tooltip' : 'valid-feedback'
    });

    const invalidFeedbackClassName = computed(() => {
      return props.tooltipFeedback ? 'invalid-tooltip' : 'invalid-feedback'
    });

    // Validation ------------------------
    const isInputValidated = ref(props.isValidated);
    const isInputValid = ref(props.isValid);

    const handleValidation = (e) => {
      isInputValid.value = e.target.checkValidity();
      isInputValidated.value = true;
    };

    const bindValidationEvent = () => {
      on(inputRef.value, 'change', handleValidation);
    };

    function handleChange() {
      inputValue.value = !inputValue.value;
      emit('update:modelValue', inputValue.value);
    }

    onMounted(() => {
      if (props.validateOnChange)
        bindValidationEvent();
    });

    onUnmounted(() => {
      off(inputRef.value, 'change', handleValidation);
    });

    watchEffect(() => (inputValue.value = props.modelValue));

    watch(
      () => props.isValidated,
      value => (isInputValidated.value = value)
    );

    watch(
      () => props.isValid,
      value => (isInputValid.value = value)
    );

    return {
      inputRef,
      wrapperClassName,
      inputClassName,
      labelClassName,
      validFeedbackClassName,
      invalidFeedbackClassName,
      inputValue,
      handleChange,
      uid,
      props
    }
  }
};

const _hoisted_1$4 = ["id", "checked", "required", "aria-required"];
const _hoisted_2$4 = ["for"];
const _hoisted_3$2 = ["id", "checked", "required", "aria-required"];
const _hoisted_4$1 = ["for"];

function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock(Fragment, null, [
    ($props.wrap)
      ? (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
          key: 0,
          class: normalizeClass($setup.wrapperClassName)
        }, {
          default: withCtx(() => [
            createElementVNode("input", mergeProps(_ctx.$attrs, {
              id: $setup.uid,
              ref: "inputRef",
              class: $setup.inputClassName,
              type: "checkbox",
              checked: $setup.inputValue,
              required: $props.required ? true : null,
              "aria-required": $props.required,
              onChange: _cache[0] || (_cache[0] = (...args) => ($setup.handleChange && $setup.handleChange(...args)))
            }), null, 16, _hoisted_1$4),
            ($props.label)
              ? (openBlock(), createElementBlock("label", {
                  key: 0,
                  class: normalizeClass($setup.labelClassName),
                  for: $setup.uid
                }, toDisplayString($props.label), 11, _hoisted_2$4))
              : createCommentVNode("", true),
            ($props.validFeedback)
              ? (openBlock(), createElementBlock("div", {
                  key: 1,
                  class: normalizeClass($setup.validFeedbackClassName)
                }, toDisplayString($props.validFeedback), 3))
              : createCommentVNode("", true),
            ($props.invalidFeedback)
              ? (openBlock(), createElementBlock("div", {
                  key: 2,
                  class: normalizeClass($setup.invalidFeedbackClassName)
                }, toDisplayString($props.invalidFeedback), 3))
              : createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["class"]))
      : createCommentVNode("", true),
    (!$props.wrap)
      ? (openBlock(), createElementBlock("input", mergeProps({ key: 1 }, _ctx.$attrs, {
          id: $setup.uid,
          ref: "inputRef",
          class: $setup.inputClassName,
          type: "checkbox",
          checked: $setup.inputValue,
          required: $props.required ? true : null,
          "aria-required": $props.required,
          onChange: _cache[1] || (_cache[1] = (...args) => ($setup.handleChange && $setup.handleChange(...args)))
        }), null, 16, _hoisted_3$2))
      : createCommentVNode("", true),
    (!$props.wrap && $props.label)
      ? (openBlock(), createElementBlock("label", {
          key: 2,
          class: normalizeClass($setup.labelClassName),
          for: $setup.uid
        }, toDisplayString($props.label), 11, _hoisted_4$1))
      : createCommentVNode("", true),
    (!$props.wrap && $props.validFeedback)
      ? (openBlock(), createElementBlock("div", {
          key: 3,
          class: normalizeClass($setup.validFeedbackClassName)
        }, toDisplayString($props.validFeedback), 3))
      : createCommentVNode("", true),
    (!$props.wrap && $props.invalidFeedback)
      ? (openBlock(), createElementBlock("div", {
          key: 4,
          class: normalizeClass($setup.invalidFeedbackClassName)
        }, toDisplayString($props.invalidFeedback), 3))
      : createCommentVNode("", true)
  ], 64))
}
var MDBCheckbox = /*#__PURE__*/_export_sfc(_sfc_main$4, [['render',_sfc_render$4]]);

const _sfc_main$3 = {
  name: 'MDBRadio',
  inheritAttrs: false,
  props: {
    id: String,
    label: String,
    inline: Boolean,
    modelValue: String,
    wrapperClass: String,
    labelClass: String,
    btnCheck: Boolean,
    required: Boolean,
    validateOnChange: Boolean,
    isValidated: Boolean,
    isValid: Boolean,
    validFeedback: String,
    invalidFeedback: String,
    tooltipFeedback: {
      type: Boolean,
      default: false
    },
    wrap: {
      type: Boolean,
      default: true
    },
    formCheck: {
      type: Boolean,
      default: true
    },
    tag: {
      type: String,
      default: 'div'
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const inputRef = ref('inputRef');
    const inputValue = ref(props.modelValue || false);
    const uid = props.id || getUID('MDBRadio-');

    const wrapperClassName = computed(() => {
      return [
        props.formCheck && !props.btnCheck ? 'form-check' : '',
        props.inline && 'form-check-inline',
        props.wrapperClass
      ]
    });
    const inputClassName = computed(() => {
      return [
        props.btnCheck ? 'btn-check' : 'form-check-input',
        isInputValidated.value && isInputValid.value && 'is-valid',
        isInputValidated.value && !isInputValid.value && 'is-invalid'
      ]
    });
    const labelClassName = computed(() => {
      return [props.labelClass || 'form-check-label']
    });

    const validFeedbackClassName = computed(() => {
      return props.tooltipFeedback ? 'valid-tooltip' : 'valid-feedback'
    });

    const invalidFeedbackClassName = computed(() => {
      return props.tooltipFeedback ? 'invalid-tooltip' : 'invalid-feedback'
    });

    // Validation ------------------------
    const isInputValidated = ref(props.isValidated);
    const isInputValid = ref(props.isValid);

    const handleValidation = (e) => {
      isInputValid.value = e.target.checkValidity();
      isInputValidated.value = true;
    };

    const bindValidationEvent = () => {
      on(inputRef.value, 'change', handleValidation);
    };

    function handleChange(e) {
      emit('update:modelValue', e.target.value);
    }

    onMounted(() => {
      if (props.validateOnChange)
        bindValidationEvent();
    });

    onUnmounted(() => {
      off(inputRef.value, 'change', handleValidation);
    });

    watchEffect(() => (inputValue.value = props.modelValue));

    watch(
      () => props.isValidated,
      value => (isInputValidated.value = value)
    );

    watch(
      () => props.isValid,
      value => (isInputValid.value = value)
    );

    return {
      inputRef,
      inputValue,
      handleChange,
      wrapperClassName,
      inputClassName,
      labelClassName,
      validFeedbackClassName,
      invalidFeedbackClassName,
      uid,
      props
    }
  }
};

const _hoisted_1$3 = ["id", "required", "aria-required"];
const _hoisted_2$3 = ["for"];
const _hoisted_3$1 = ["id", "required", "aria-required"];
const _hoisted_4 = ["for"];

function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock(Fragment, null, [
    ($props.wrap)
      ? (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
          key: 0,
          class: normalizeClass($setup.wrapperClassName)
        }, {
          default: withCtx(() => [
            withDirectives(createElementVNode("input", mergeProps(_ctx.$attrs, {
              id: $setup.uid,
              ref: "inputRef",
              "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (($setup.inputValue) = $event)),
              class: $setup.inputClassName,
              type: "radio",
              required: $props.required ? true : null,
              "aria-required": $props.required,
              onChange: _cache[1] || (_cache[1] = (...args) => ($setup.handleChange && $setup.handleChange(...args)))
            }), null, 16, _hoisted_1$3), [
              [vModelRadio, $setup.inputValue]
            ]),
            ($props.label)
              ? (openBlock(), createElementBlock("label", {
                  key: 0,
                  class: normalizeClass($setup.labelClassName),
                  for: $setup.uid
                }, toDisplayString($props.label), 11, _hoisted_2$3))
              : createCommentVNode("", true),
            ($props.validFeedback)
              ? (openBlock(), createElementBlock("div", {
                  key: 1,
                  class: normalizeClass($setup.validFeedbackClassName)
                }, toDisplayString($props.validFeedback), 3))
              : createCommentVNode("", true),
            ($props.invalidFeedback)
              ? (openBlock(), createElementBlock("div", {
                  key: 2,
                  class: normalizeClass($setup.invalidFeedbackClassName)
                }, toDisplayString($props.invalidFeedback), 3))
              : createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["class"]))
      : createCommentVNode("", true),
    (!$props.wrap)
      ? withDirectives((openBlock(), createElementBlock("input", mergeProps({ key: 1 }, _ctx.$attrs, {
          id: $setup.uid,
          ref: "inputRef",
          "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => (($setup.inputValue) = $event)),
          class: $setup.inputClassName,
          type: "radio",
          required: $props.required ? true : null,
          "aria-required": $props.required,
          onChange: _cache[3] || (_cache[3] = (...args) => ($setup.handleChange && $setup.handleChange(...args)))
        }), null, 16, _hoisted_3$1)), [
          [vModelRadio, $setup.inputValue]
        ])
      : createCommentVNode("", true),
    (!$props.wrap && $props.label)
      ? (openBlock(), createElementBlock("label", {
          key: 2,
          class: normalizeClass($setup.labelClassName),
          for: $setup.uid
        }, toDisplayString($props.label), 11, _hoisted_4))
      : createCommentVNode("", true),
    (!$props.wrap && $props.validFeedback)
      ? (openBlock(), createElementBlock("div", {
          key: 3,
          class: normalizeClass($setup.validFeedbackClassName)
        }, toDisplayString($props.validFeedback), 3))
      : createCommentVNode("", true),
    (!$props.wrap && $props.invalidFeedback)
      ? (openBlock(), createElementBlock("div", {
          key: 4,
          class: normalizeClass($setup.invalidFeedbackClassName)
        }, toDisplayString($props.invalidFeedback), 3))
      : createCommentVNode("", true)
  ], 64))
}
var MDBRadio = /*#__PURE__*/_export_sfc(_sfc_main$3, [['render',_sfc_render$3]]);

const _sfc_main$2 = {
  name: 'MDBFile',
  props: {
    id: String,
    inputClass: String,
    invalidFeedback: String,
    isInvalid: Boolean,
    isValid: Boolean,
    isValidated: Boolean,
    label: String,
    labelClass: String,
    modelValue: {
      type: [FileList, Array],
      default: () => []
    },
    size: String,
    tooltipFeedback: Boolean,
    validFeedback: String,
    validateOnChange: Boolean
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const uid = props.id || getUID('MDBFile-');
    const inputValue = ref(props.modelValue);

    const inputClassName = computed(() => {
      return [
        'form-control',
        props.size && `form-control-${props.size}`,
        isInputValidated.value && isInputValid.value && 'is-valid',
        isInputValidated.value && !isInputValid.value && 'is-invalid',
        props.inputClass
      ]
    });
    const labelClassName = computed(() => {
      return ['form-label', props.labelClass]
    });
    const validFeedbackClassName = computed(() => {
      return props.tooltipFeedback ? 'valid-tooltip' : 'valid-feedback'
    });
    const invalidFeedbackClassName = computed(() => {
      return props.tooltipFeedback ? 'invalid-tooltip' : 'invalid-feedback'
    });

    // Validation ------------------------
    const isInputValidated = ref(props.isValidated);
    const isInputValid = ref(props.isValid);

    const handleValidation = (event) => {
      isInputValid.value = event.target.files.length > 0;
      isInputValidated.value = true;
    };

    const handleChange = (event) => {
      inputValue.value = event.target.files;
      emit('update:modelValue', inputValue.value);

      if (props.validateOnChange)
        handleValidation(event);
    };

    watch(
      () => props.modelValue,
      value => (inputValue.value = value)
    );

    watch(
      () => props.isValidated,
      value => (isInputValidated.value = value)
    );

    watch(
      () => props.isValid,
      (value) => {
        isInputValid.value = value;
      }
    );

    return {
      uid,
      inputClassName,
      labelClassName,
      validFeedbackClassName,
      invalidFeedbackClassName,
      handleChange
    }
  }
};

const _hoisted_1$2 = ["for"];
const _hoisted_2$2 = ["id"];

function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock(Fragment, null, [
    ($props.label)
      ? (openBlock(), createElementBlock("label", {
          key: 0,
          class: normalizeClass($setup.labelClassName),
          for: $setup.uid
        }, toDisplayString($props.label), 11, _hoisted_1$2))
      : createCommentVNode("", true),
    createElementVNode("input", mergeProps(_ctx.$attrs, {
      id: $setup.uid,
      type: "file",
      class: $setup.inputClassName,
      onChange: _cache[0] || (_cache[0] = (...args) => ($setup.handleChange && $setup.handleChange(...args)))
    }), null, 16, _hoisted_2$2),
    ($props.validFeedback)
      ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass($setup.validFeedbackClassName)
        }, toDisplayString($props.validFeedback), 3))
      : createCommentVNode("", true),
    ($props.invalidFeedback)
      ? (openBlock(), createElementBlock("div", {
          key: 2,
          class: normalizeClass($setup.invalidFeedbackClassName)
        }, toDisplayString($props.invalidFeedback), 3))
      : createCommentVNode("", true)
  ], 64))
}
var MDBFile = /*#__PURE__*/_export_sfc(_sfc_main$2, [['render',_sfc_render$2]]);

const _sfc_main$1 = {
  name: 'MDBRange',
  inheritAttrs: false,
  props: {
    id: String,
    inputClass: String,
    label: String,
    labelClass: String,
    max: {
      type: Number,
      default: 100
    },
    min: {
      type: Number,
      default: 0
    },
    modelValue: {
      type: Number,
      default: 50
    },
    tag: {
      type: String,
      default: 'div'
    },
    thumb: {
      type: Boolean,
      default: true
    },
    thumbClass: String,
    wrapperClass: String
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const inputValue = ref(props.modelValue);
    const minValue = ref(props.min);
    const maxValue = ref(props.max);
    const uid = props.id || getUID('MDBRange-');
    const isThumbActive = ref(false);

    const wrapperClassName = computed(() => {
      return ['range', props.wrapperClass]
    });
    const inputClassName = computed(() => {
      return ['form-range', props.inputClass]
    });
    const labelClassName = computed(() => {
      return ['form-label', props.labelClass]
    });
    const thumbClassName = computed(() => {
      return ['thumb', isThumbActive.value && 'thumb-active', props.thumbClass]
    });
    const thumbLeftPosition = ref(0);

    const handleInput = (e) => {
      inputValue.value = parseFloat(e.target.value);
      emit('update:modelValue', inputValue.value);

      setThumbPosition();
    };

    const toggleThumb = (isActive) => {
      isThumbActive.value = isActive;
    };

    const setThumbPosition = () => {
      const left = parseFloat(
        ((inputValue.value - minValue.value) * 100)
          / (maxValue.value - minValue.value)
      );

      thumbLeftPosition.value = `calc(${left}% + (${8 - left * 0.15}px))`;
    };

    nextTick(() => {
      setThumbPosition();
    });

    watch(
      () => props.modelValue,
      (value) => {
        inputValue.value = value;
        setThumbPosition();
      }
    );

    return {
      inputValue,
      minValue,
      maxValue,
      uid,
      wrapperClassName,
      inputClassName,
      labelClassName,
      thumbClassName,
      thumbLeftPosition,
      props,
      handleInput,
      toggleThumb
    }
  }
};

const _hoisted_1$1 = ["for"];
const _hoisted_2$1 = ["id", "value", "min", "max"];
const _hoisted_3 = { class: "thumb-value" };

function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock(Fragment, null, [
    ($props.label)
      ? (openBlock(), createElementBlock("label", {
          key: 0,
          class: normalizeClass($setup.labelClassName),
          for: $setup.uid
        }, toDisplayString($props.label), 11, _hoisted_1$1))
      : createCommentVNode("", true),
    (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
      class: normalizeClass($setup.wrapperClassName)
    }, {
      default: withCtx(() => [
        createElementVNode("input", mergeProps({
          id: $setup.uid,
          type: "range",
          class: $setup.inputClassName,
          value: $setup.inputValue,
          min: $setup.minValue,
          max: $setup.maxValue
        }, _ctx.$attrs, {
          onInput: _cache[0] || (_cache[0] = (...args) => ($setup.handleInput && $setup.handleInput(...args))),
          onMousedown: _cache[1] || (_cache[1] = $event => ($setup.toggleThumb(true))),
          onTouchstart: _cache[2] || (_cache[2] = $event => ($setup.toggleThumb(true))),
          onMouseup: _cache[3] || (_cache[3] = $event => ($setup.toggleThumb(false))),
          onTouchend: _cache[4] || (_cache[4] = $event => ($setup.toggleThumb(false)))
        }), null, 16, _hoisted_2$1),
        ($props.thumb)
          ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: normalizeClass($setup.thumbClassName),
              style: normalizeStyle({ left: $setup.thumbLeftPosition })
            }, [
              createElementVNode("span", _hoisted_3, toDisplayString($setup.inputValue), 1)
            ], 6))
          : createCommentVNode("", true)
      ]),
      _: 1
    }, 8, ["class"]))
  ], 64))
}
var MDBRange = /*#__PURE__*/_export_sfc(_sfc_main$1, [['render',_sfc_render$1]]);

const _sfc_main = {
  name: 'MDBSwitch',
  inheritAttrs: false,
  props: {
    id: String,
    inputClass: String,
    label: String,
    labelClass: String,
    modelValue: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: 'div'
    },
    wrapperClass: String
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const inputValue = ref(props.modelValue);
    const uid = props.id || getUID('MDBSwitch-');

    const wrapperClassName = computed(() => {
      return ['form-check form-switch', props.wrapperClass]
    });
    const inputClassName = computed(() => {
      return ['form-check-input', props.inputClass]
    });
    const labelClassName = computed(() => {
      return ['form-check-label', props.labelClass]
    });

    function handleChange() {
      inputValue.value = !inputValue.value;
      emit('update:modelValue', inputValue.value);
    }

    watch(
      () => props.modelValue,
      value => (inputValue.value = value)
    );

    return {
      inputValue,
      uid,
      wrapperClassName,
      inputClassName,
      labelClassName,
      handleChange
    }
  }
};

const _hoisted_1 = ["id", "checked"];
const _hoisted_2 = ["for"];

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.wrapperClassName)
  }, {
    default: withCtx(() => [
      createElementVNode("input", mergeProps({
        id: $setup.uid,
        type: "checkbox",
        class: $setup.inputClassName
      }, _ctx.$attrs, {
        checked: $setup.inputValue,
        onChange: _cache[0] || (_cache[0] = (...args) => ($setup.handleChange && $setup.handleChange(...args)))
      }), null, 16, _hoisted_1),
      createElementVNode("label", {
        class: normalizeClass($setup.labelClassName),
        for: $setup.uid
      }, toDisplayString($props.label), 11, _hoisted_2)
    ]),
    _: 1
  }, 8, ["class"]))
}
var MDBSwitch = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render]]);

const mdbScrollspy = {
  mounted(el, binding) {
    el.scrollspy = {
      links: [],
      container: window,
      scrollPosition: null,
      async: false,
      offset: 0
    };

    if (binding.value) {
      el.scrollspy.container
        = document.getElementById(binding.value.container) || window;
      el.scrollspy.async = binding.value.async || false;
      el.scrollspy.offset = binding.value.offset || 0;
    }

    el.scrollspy.scrollPosition = getScrollPostion(el.scrollspy.container);

    el.scrollspy.findHrefs = (node) => {
      if (node.attributes && node.attributes.href) {
        el.scrollspy.links.push(node);
        if (node.classList.contains('collapsible-scrollspy')) {
          const list = node.parentNode.querySelector('ul');
          list.dataset.mdbCollapsibleScrollspyHeight = list.clientHeight;

          list.style.overflow = 'hidden';
          list.style.height = '0';
        }
      }
      else if (node.childNodes) {
        node.childNodes.forEach(child => el.scrollspy.findHrefs(child));
      }
    };

    el.scrollspy.setActive = (index) => {
      if (binding.value && binding.value.callback) {
        binding.instance[binding.value.callback](index);
        return
      }
      el.scrollspy.links.forEach((link, i) => {
        if (index === i)
          link.classList.add('active');
        else
          link.classList.remove('active');
      });

      setNestedActive(el.scrollspy.links, index, el.scrollspy.container);
      setCollapsibleActive(el.scrollspy.links);
    };

    el.scrollspy.spy = () => {
      if (el.disableScroll) return

      const container = el.scrollspy.container;

      el.scrollspy.scrollPosition = getScrollPostion(container);

      el.scrollspy.links.forEach((link) => {
        const element = document.querySelector(link.hash);
        if (!element)
          return

        const rect = element.getBoundingClientRect();

        let condition;

        if (container === window) {
          condition
            = window.innerHeight > rect.top && rect.top + rect.height >= 0;
        }
        else {
          const containerRect = container.getBoundingClientRect();

          condition
            = rect.top <= containerRect.top + containerRect.height
            && rect.top + rect.height >= containerRect.top;
        }

        link.isLinkActive = condition;
      });

      const activeLinks = el.scrollspy.links.filter(
        link => link.isLinkActive
      );

      if (activeLinks.length > 0) {
        const activeElement = activeLinks[0];
        const activeLink = activeElement.scrollspyIndex;

        el.scrollspy.setActive(activeLink);
      }
      else {
        el.scrollspy.setActive(-1);
      }
    };

    el.scrollspy.clickHandler = (e, link) => {
      const container = el.scrollspy.container;

      window.clearTimeout(el.disableScrollTimeout);
      el.disableScroll = true;
      e.preventDefault();

      const element = document.querySelector(link.hash);
      if (!element)
        return

      const rect = element.getBoundingClientRect();

      if (container === window) {
        window.scrollTo({
          top: window.scrollY + rect.y - el.scrollspy.offset
        });
      }
      else {
        const containerRect = container.getBoundingClientRect();
        container.style.scrollBehavior = 'smooth';
        container.scrollTop
          = container.scrollTop + rect.y - containerRect.y - el.scrollspy.offset;
      }

      el.scrollspy.setActive(link.scrollspyIndex);
      setParentsActive(el.scrollspy.links[link.scrollspyIndex], el);
      setCollapsibleActive(el.scrollspy.links);

      el.disableScrollTimeout = setTimeout(() => {
        el.disableScroll = false;
      }, 800);
    };

    el.scrollspy.findHrefs(el);

    el.scrollspy.links.forEach((link, i) => {
      link.scrollspyIndex = i;
      link.addEventListener('click', e => el.scrollspy.clickHandler(e, link));
    });

    el.scrollspy.spy();

    el.scrollspy.container.addEventListener('scroll', el.scrollspy.spy);
    window.addEventListener('resize', el.scrollspy.spy);
  },

  updated(el, binding) {
    if (
      binding.modifiers.async
      && !binding.value.loading
      && binding.oldValue.loading
    ) {
      setTimeout(() => {
        el.scrollspy.links = [];
        el.scrollspy.findHrefs(el);
        el.scrollspy.links.forEach((link, i) => {
          link.scrollspyIndex = i;
          link.addEventListener('click', e =>
            el.scrollspy.clickHandler(e, link)
          );
        });

        el.scrollspy.spy();
      }, 0);
    }
  },

  unmounted(el) {
    window.removeEventListener('scroll', el.scrollspy.spy);
    window.removeEventListener('resize', el.scrollspy.spy);
  }
};

const setNestedActive = (links, index, container) => {
  const allLinks = links[index];

  if (!allLinks)
    return

  const allNestedLinks = [...allLinks.parentNode.querySelectorAll('a')];
  allNestedLinks.shift();
  allNestedLinks.forEach((link) => {
    const element = document.querySelector(link.hash);
    if (!element)
      return

    const rect = element.getBoundingClientRect();

    let condition;

    if (container === window) {
      condition = window.innerHeight > rect.top && rect.top + rect.height >= 0;
    }
    else {
      const containerRect = container.getBoundingClientRect();

      condition
        = rect.top < containerRect.top
        && rect.top + rect.height > containerRect.top;
    }

    link.isActive = condition;
  });

  const activeLinks = allNestedLinks.filter(link => link.isLinkActive);
  if (activeLinks.length > 0)
    activeLinks[0].classList.add('active');
};

const setParentsActive = (link, el) => {
  let parent = link.parentNode;

  if (!parent)
    return

  while (parent !== el) {
    if (parent.classList.contains('nav-item'))
      parent.querySelector('a').classList.add('active');

    parent = parent.parentNode;
  }
};

const getScrollPostion = (container) => {
  return container === window ? container.scrollY : container.scrollTop
};

const setCollapsibleActive = (links) => {
  links.forEach((link) => {
    if (
      link.classList.contains('collapsible-scrollspy')
      && link.classList.contains('active')
    ) {
      const list = link.parentNode.querySelector('ul');

      list.style.overflow = 'hidden';
      list.style.height = `${list.dataset.mdbCollapsibleScrollspyHeight}px`;
    }
    else if (link.classList.contains('collapsible-scrollspy')) {
      const list = link.parentNode.querySelector('ul');

      list.style.overflow = 'hidden';
      list.style.height = '0';
    }
  });
};

export { MDBAccordion, MDBAccordionItem, MDBBadge, MDBBreadcrumb, MDBBreadcrumbItem, MDBBtn, MDBBtnClose, MDBBtnGroup, MDBCard, MDBCardBody, MDBCardFooter, MDBCardGroup, MDBCardHeader, MDBCardImg, MDBCardLink, MDBCardText, MDBCardTitle, MDBCarousel, MDBCheckbox, MDBCol, MDBCollapse, MDBContainer, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBFile, MDBFooter, MDBIcon, MDBInput, MDBListGroup, MDBListGroupItem, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader, MDBModalTitle, MDBNavbar, MDBNavbarBrand, MDBNavbarItem, MDBNavbarNav, MDBNavbarToggler, MDBPageItem, MDBPageNav, MDBPagination, MDBPopover, MDBProgress, MDBProgressBar, MDBRadio, MDBRange, MDBRow, MDBSpinner, MDBSwitch, MDBTabContent, MDBTabItem, MDBTabNav, MDBTabPane, MDBTable, MDBTabs, MDBTextarea, MDBTooltip, mdbRipple, mdbScrollspy };
//# sourceMappingURL=mdb-vue-ui-kit.es.js.map
