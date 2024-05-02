import { defineComponent as S, reactive as j, watch as I, computed as A, createVNode as s, Fragment as se, ref as p, onBeforeMount as ve, onBeforeUnmount as xe, provide as M, inject as D, onMounted as F, nextTick as ue, withDirectives as z, vModelDynamic as Dt, vShow as Y, onUnmounted as ft, unref as fe, getCurrentScope as Et, onScopeDispose as Bt, Teleport as Le, createTextVNode as ae, openBlock as V, createElementBlock as R, normalizeStyle as oe, renderSlot as Pe, resolveComponent as q, createBlock as J, withCtx as U, createElementVNode as x, renderList as Ae, normalizeClass as Z, toDisplayString as ee, toRefs as _e, getCurrentInstance as De, Transition as pe, withModifiers as ht, createCommentVNode as he, toRef as Mt, createApp as We, resolveDirective as Tt, h as Ge } from "vue";
const Rt = /* @__PURE__ */ S({
  name: "AButton",
  props: {
    type: {
      type: String,
      default: () => "default"
    },
    size: {
      type: String,
      default: () => "default"
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    loading: {
      type: Boolean,
      default: !1
    },
    dashed: {
      type: Boolean,
      default: !1
    },
    icon: {
      type: String,
      default: ""
    },
    text: {
      type: Boolean,
      default: !1
    },
    ghost: {
      type: Boolean,
      default: !1
    },
    round: {
      type: Boolean,
      default: !1
    },
    circle: {
      type: Boolean,
      default: !1
    },
    color: {
      type: String,
      default: ""
    },
    full: {
      type: Boolean,
      default: !1
    }
  },
  setup(e, {
    slots: n
  }) {
    const t = j({
      color: "",
      hover: "",
      active: ""
    }), a = () => {
      switch (e.size) {
        case "small":
          return "size-s";
        case "default":
          return "size-m";
        case "large":
          return "size-l";
        default:
          return "";
      }
    }, l = (d, c, h, i) => {
      t.color = d, t.hover = c, t.active = h;
    }, o = () => {
      const {
        type: d,
        disabled: c,
        text: h
      } = e;
      l(i("color"), i("hover"), i("active"));
      function i(v = "") {
        if (d === "default")
          return c && ["color", "hover"].includes(v) ? "var(--a-text-color)" : "var(--a-primary-color)";
        if (h && c && ["color", "hover"].includes(v))
          return "var(--a-text-color)";
        {
          const m = v === "color" ? "" : `-${v}`;
          return `var(--a-${d}${m}-color)`;
        }
      }
    };
    I(() => e.type, () => o());
    const r = A(() => {
      const {
        dashed: d,
        text: c,
        type: h,
        disabled: i,
        loading: v,
        ghost: m,
        round: y,
        circle: C,
        color: k,
        size: g
      } = e, w = e.full ? "100%" : "auto", b = d || m || c || h === "default" ? t.color : "var(--a-text-color-white)", $ = i && h === "default" ? "var(--a-border-color)" : t.color, _ = d || m ? "var(--a-bg-color)" : t.color, L = i ? t.color : t.hover, H = v || c || i ? "" : k || t.color, K = i ? t.color : t.active;
      return {
        "--button-width": w,
        "--button-color": b,
        "--button-border-color": $,
        "--button-bg-color": _,
        "--button-hover-color": L,
        "--button-ripple-color": H,
        "--button-active-color": K,
        "--button-line-type": d ? "dashed" : "solid",
        "--button-masker-zIndex": v || i ? "100" : "0",
        "--button-cursor-type": i ? "not-allowed" : v ? "wait" : "",
        "--button-border-radius": y ? "34px" : C ? "50%" : "3px",
        // 自定义按钮颜色
        "--button-self-define-filter": i ? "brightness(1)" : "brightness(.9)",
        "--button-self-define-opacity": i ? "0.5" : "0.8",
        "--button-self-define-color": m || c ? k : "var(--a-text-color-white)",
        "--button-self-define-bg-color": m || c ? "var(--a-bg-color)" : k,
        "--button-self-define-border-color": c ? "transparent" : k,
        // 圆形按钮宽高
        "--button-circle-width": g === "default" ? "34px" : g === "small" ? "28px" : "40px",
        "--button-circle-height": g === "default" ? "34px" : g === "small" ? "28px" : "40px"
      };
    }), u = () => {
      if (e.loading)
        return s("div", {
          class: "is-loading"
        }, [s(G, {
          class: "a-loading-icon",
          name: "loading"
        }, null)]);
      if (n.icon)
        return s(se, null, [n.icon()]);
      if (e.icon)
        return s(G, {
          name: e.icon
        }, null);
    }, f = () => {
      const {
        type: d,
        dashed: c,
        text: h,
        ghost: i,
        disabled: v,
        circle: m,
        color: y
      } = e;
      return ["a-button", a(), d === "default" ? "bg-default" : "", c || h || i ? "" : "a-solid-button", h ? "bg-text" : "", v ? "bg-disabled" : "", y ? "bg-self-define" : "", m ? "bg-circle" : ""].filter(Boolean);
    };
    return o(), () => s("button", {
      style: r.value,
      class: f()
    }, [s("div", {
      class: "a-button-content"
    }, [(e.loading || e.icon || n.icon) && s("div", {
      class: "icon-slot-content"
    }, [u()]), n.default ? n.default() : ""]), s("div", {
      onClick: (d) => d.stopPropagation(),
      class: "a-button-masker"
    }, null)]);
  }
}), Lt = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), me = Lt(Rt);
const Pt = /* @__PURE__ */ S({
  name: "AIcon",
  props: {
    name: {
      type: String,
      defalut: "amu-amudesign"
    }
  },
  setup(e) {
    return () => s("span", {
      class: `iconfont icon-${e.name}`
    }, null);
  }
}), Ot = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), G = Ot(Pt);
class Nt {
  constructor() {
    this.state = {};
  }
  $on(n, t) {
    this.state[n] = t;
  }
  $emit(n, ...t) {
    const a = this.state[n];
    typeof a == "function" ? a(...t) : console.error("callback is not a function eventName：" + n);
  }
  $off(n) {
    n && this.state[n] ? delete this.state[n] : this.state = {};
  }
}
const T = new Nt();
let Me = /* @__PURE__ */ function(e) {
  return e.OPEN = "open", e.CLOSE = "close", e;
}({}), Te = /* @__PURE__ */ function(e) {
  return e.UPDATE_MODEL_VALUE = "update-modelValue", e;
}({});
const Ft = /* @__PURE__ */ S({
  name: "ACollapse",
  props: {
    modelValue: {
      type: [Array, String],
      default: []
    },
    accordion: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:modelValue"],
  setup(e, {
    emit: n,
    slots: t
  }) {
    const a = t.default(), l = p("");
    ve(() => {
      o();
    }), xe(() => {
      T.$off(Te.UPDATE_MODEL_VALUE);
    });
    const o = () => {
      T.$on(Te.UPDATE_MODEL_VALUE, r);
    }, r = (u, f) => {
      let d = [];
      if (Array.isArray(e.modelValue))
        switch (u) {
          case Me.OPEN:
            d = [.../* @__PURE__ */ new Set([...e.modelValue, ...f])];
            break;
          case Me.CLOSE:
            d = e.modelValue, d.forEach((c, h) => {
              c === f && d.splice(h, 1);
            });
            break;
        }
      else
        d = f, e.accordion && (l.value = f);
      n("update:modelValue", d);
    };
    return M("model-value", e.modelValue), M("accordion", e.accordion), () => s("div", {
      class: "a-collapse-content"
    }, [a.map((u) => s(u, {
      currentName: l.value
    }, null))]);
  }
}), Ht = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), zt = Ht(Ft);
const Wt = /* @__PURE__ */ S({
  name: "ACollapseItem",
  props: {
    title: {
      type: String,
      default: ""
    },
    name: {
      type: String
    },
    currentName: String
  },
  emits: [],
  setup(e, {
    slots: n
  }) {
    let t;
    const a = D("model-value"), l = p(null), o = p(null), r = p(0);
    F(() => {
      r.value = o.value.offsetHeight, t = l.value.querySelector(".a-collapse-item-head-icon"), o.value.style.height = "0px", Array.isArray(a) ? a.includes(e.name) && f() : a && a === e.name && f();
    }), I(() => e.currentName, (c) => {
      c !== e.name && d();
    });
    const u = () => {
      Number(o.value.style.height.split("p")[0]) === 0 ? (f(), T.$emit(Te.UPDATE_MODEL_VALUE, Me.OPEN, e.name)) : (d(), T.$emit(Te.UPDATE_MODEL_VALUE, Me.CLOSE, e.name));
    }, f = () => {
      o.value.style.height = r.value + "px", t.style.transform = "rotate(90deg)";
    }, d = () => {
      t.style.transform = "rotate(0deg)", o.value.style.height = "0px";
    };
    return () => s(se, null, [s("div", {
      class: "a-collapse-item"
    }, [s("div", {
      ref: l,
      onClick: () => u(),
      class: "a-collapse-item-head"
    }, [s("div", {
      class: "a-collapse-item-head-title"
    }, [e.title]), s("div", {
      class: "a-collapse-item-head-icon iconfont icon-right"
    }, null)]), s("div", {
      ref: o,
      class: "a-collapse-item-content"
    }, [n.default ? n.default() : "", s("div", {
      style: "height:15px"
    }, null)])])]);
  }
}), Yt = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), Kt = Yt(Wt);
const jt = /* @__PURE__ */ S({
  name: "ATabs",
  props: {
    defaultActiveKey: [String, Number],
    position: {
      type: String,
      default: () => "top"
    }
  },
  emits: ["change"],
  setup(e, n) {
    const t = j({
      barWidth: 0,
      barOffset: 0
    }), a = p(), l = n.slots.default(), o = l.map((h) => {
      const {
        props: i = {}
      } = h, {
        key: v,
        title: m
      } = i;
      return {
        key: v,
        title: m
      };
    }), r = p(e.defaultActiveKey), u = e.position === "top" || e.position !== "left", f = A(() => {
      const h = u ? `translate3d(${t.barOffset}px,0px,0px)` : `translate3d(0px,${t.barOffset}px,0px)`;
      return {
        width: `${t.barWidth}px`,
        transform: h
      };
    });
    F(() => {
      d();
    });
    const d = () => {
      ue(() => {
        const h = o.findIndex((m) => m.key === r.value), i = a.value.querySelectorAll(".tabs-tab"), v = i[h];
        if (t.barWidth = v ? u ? v.offsetWidth : v.offsetHeight : 0, h > 0) {
          let m = 0;
          for (let y = 0; y < h; y++) {
            const C = i[y];
            m += u ? C.offsetWidth : C.offsetHeight;
          }
          t.barOffset = m;
        } else
          t.barOffset = 0;
      });
    }, c = (h) => {
      r.value = h, d(), n.emit("change", h);
    };
    return () => s("div", {
      class: "tabs-content",
      style: u ? {
        flexDirection: "column"
      } : ""
    }, [s("div", {
      class: "tabs"
    }, [s("div", {
      ref: a,
      class: "tabs-nav-wrap",
      style: u ? {
        borderBottom: "1px solid var(--a-border-color)"
      } : {
        borderRight: "1px solid var(--a-border-color)"
      }
    }, [s("div", {
      class: u ? "tabs-inv-bar-top" : "tabs-inv-bar-left",
      style: f.value
    }, null), s("div", {
      class: "tab-list",
      style: u ? "" : {
        flexDirection: "column",
        alignItems: "flex-end"
      }
    }, [o.map((h) => {
      const {
        key: i,
        title: v
      } = h;
      return s("div", {
        class: `tabs-tab ${i === r.value ? "tabs-tab-active" : ""}`,
        key: i,
        onClick: () => c(i)
      }, [v]);
    })])])]), s("div", {
      class: "pane-content"
    }, [l.filter((h) => {
      const {
        props: i
      } = h, {
        key: v
      } = i;
      return r.value === v && s(h, null, null);
    })])]);
  }
}), Ut = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), Gt = Ut(jt), qt = /* @__PURE__ */ S({
  name: "ATabsPanel",
  props: ["key", "title"],
  setup(e, {
    slots: n
  }) {
    return () => s("div", null, [n.default ? n.default() : ""]);
  }
}), Xt = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), Qt = Xt(qt);
let ge = /* @__PURE__ */ function(e) {
  return e.ENTER = "enter", e.CLICK = "click", e;
}({}), ke = /* @__PURE__ */ function(e) {
  return e.STAR_ON = "iconfont icon-xingxing", e.STAR_OFF = "iconfont icon-xingxing1", e;
}({});
const Jt = /* @__PURE__ */ S({
  name: "ARate",
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 5
    },
    color: {
      type: String,
      default: "#f7ba2a"
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:modelValue"],
  setup(e, {
    emit: n
  }) {
    const t = p(null), a = p([]);
    F(() => {
      l(), u();
    });
    const l = () => {
      for (let f = 0; f < e.modelValue; f++)
        a.value.push(f);
    }, o = (f, d = ge.ENTER) => {
      var i;
      if (e.disabled)
        return;
      const c = f.target.getAttribute("index"), h = (i = t.value) == null ? void 0 : i.querySelectorAll(".a-rate-item");
      r(d, h, Number(c)), d === ge.CLICK && n("update:modelValue", Number(c));
    }, r = (f, d, c) => {
      f === ge.CLICK && (a.value = []);
      for (let h = 0; h < d.length; h++) {
        const i = d[h], v = Number(i.getAttribute("index")), m = i.querySelector(".iconfont");
        switch (f) {
          case ge.CLICK:
            v <= c && a.value.push(v);
            break;
          case ge.ENTER:
            m.className = v <= c ? ke.STAR_ON : ke.STAR_OFF;
            break;
        }
      }
    }, u = () => {
      t.value.querySelectorAll(".a-rate-item").forEach((d) => {
        const c = d.querySelector(".iconfont"), h = Number(d.getAttribute("index"));
        a.value.includes(h) ? c.className = ke.STAR_ON : c.className = ke.STAR_OFF;
      });
    };
    return () => s("div", {
      class: "a-rate-content",
      style: `cursor:${e.disabled ? "not-allowed" : "pointer"}`,
      ref: t,
      onMouseleave: () => u()
    }, [new Array(e.max).fill("").map((f, d) => s("div", {
      class: "a-rate-item",
      index: d,
      onMouseenter: (c) => o(c),
      onClick: (c) => o(c, ge.CLICK)
    }, [s("div", {
      index: d,
      style: {
        color: e.disabled ? "#c8c9cc" : e.color
      },
      class: `iconfont ${ke.STAR_OFF}`
    }, null)]))]);
  }
}), Zt = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), en = Zt(Jt);
const tn = /* @__PURE__ */ S({
  name: "AInput",
  props: {
    modelValue: {
      type: [String, Number]
    },
    value: {
      type: [String, Number],
      default: ""
    },
    textCenter: {
      type: Boolean,
      default: !1
    },
    width: [Number, String],
    height: [Number, String],
    disabled: {
      type: Boolean,
      default: !1
    },
    clearable: {
      type: Boolean,
      default: !1
    },
    type: {
      type: String,
      default: "text"
    },
    showPassword: {
      type: Boolean,
      default: !1
    },
    placeholder: {
      type: String,
      default: "Please input"
    },
    isSearch: {
      type: Boolean,
      default: !1
    },
    isSelector: {
      type: Boolean,
      default: !1
    },
    isDate: {
      type: Boolean,
      default: !1
    },
    readonly: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:modelValue", "change", "blur", "focus", "resetValue", "enter"],
  setup(e, {
    emit: n,
    slots: t,
    expose: a
  }) {
    const l = p(e.modelValue === void 0 ? e.value : e.modelValue), o = D("prop", ""), r = p(e.type), u = p(!1), f = p(!1), d = p(!1), c = p("var(--a-primary-color)"), h = p("var(--a-border-color)"), i = p("var(--a-primary-color)"), v = p("var(--a-primary-color)"), m = p(null), y = p(null), C = p(null), k = D("uniKey", null), g = D("rules", null), w = D("model", null), b = D("changeErrorMessage", null), $ = D("shrinkFormErrorSwitchFn", null), _ = D("shrinkSelectMenuSwitchFn", null), L = A(() => ({
      width: e.width ? e.width + "px" : "100%",
      height: e.height ? e.height + "px" : "34px",
      textAlign: e.textCenter ? "center" : "",
      backgroundColor: e.disabled ? "var(--a-bg-grey-color)" : "",
      "--input-text-color": e.disabled ? "var(--a-text-disable-color)" : "var(--a-text-color)"
    })), H = A(() => e.clearable || e.isDate || e.isSearch || e.isSelector || e.type === "password");
    I(() => [e.width, e.height], () => {
      K();
    }, {
      deep: !0
    }), I(() => e.modelValue, (O) => {
      l.value = O;
    }), I(() => e.value, (O) => {
      l.value = O;
    }), F(() => {
      K();
    });
    const K = () => {
      m.value.style.flexGrow = e.width ? "0" : "1";
    }, E = () => {
      e.type === "password" && e.showPassword ? (r.value = r.value === "password" ? "text" : "password", f.value = !f.value) : (l.value = "", n("update:modelValue", l.value)), setTimeout(() => {
        y.value.focus();
      });
    };
    I(() => l.value, () => {
      l.value === "" ? u.value = !1 : u.value = !0;
    });
    const B = (O) => {
      const X = O.target, Q = e.type === "number" ? X.value === "" ? X.value : Number(X.value) : X.value;
      l.value = Q, n("update:modelValue", l.value), n("change", l.value), Ne("change");
    }, N = (O) => {
      d.value = !1, n("blur", O), Ne("blur"), C.value && (C.value.$el.style.transform = "rotate(0deg)");
    }, P = (O) => {
      d.value = !0, l.value.toString().length > 0 && (u.value = !0), C.value && (C.value.$el.style.transform = "rotate(-180deg)"), _ && _.value(1, 0.2), n("focus", O);
    }, te = () => s("div", null, [u.value && s("span", {
      onMousedown: () => E(),
      class: "iconfont icon-guanbi"
    }, null)]), re = () => s("div", null, [u.value && s("div", {
      onMousedown: () => E()
    }, [s(G, {
      name: f.value ? "select" : "hide"
    }, null)])]), ne = () => s("div", {
      onMousedown: () => E()
    }, [s(G, {
      name: "calendar"
    }, null)]), le = () => s("div", {
      onMousedown: () => E()
    }, [s(G, {
      name: "search"
    }, null)]), ce = () => s("div", {
      onMousedown: () => E()
    }, [s(G, {
      name: "arrow-down",
      ref: C
    }, null)]), de = () => {
      if (e.clearable)
        return e.type === "password" && e.showPassword ? re() : te();
      if (e.isDate)
        return ne();
      if (e.isSelector)
        return e.isSearch ? le() : ce();
      if (e.type === "password" && e.showPassword)
        return re();
    }, Ne = (O) => {
      if (u.value = !1, g && g[o])
        for (let X = 0; X < g[o].length; X++) {
          const Q = g[o][X];
          if (Q.trigger === O) {
            if (Q.required === !0) {
              if (l.value === "") {
                ie("error", Q.message);
                return;
              }
              ie();
            }
            if (l.value.toString().length < Q.min || l.value.toString().length > Q.max) {
              ie("error", Q.message);
              return;
            } else
              ie();
            Q.validator && typeof Q.validator == "function" && Q.validator(Q, l.value, (Ue) => {
              Ue ? ie("error", Ue.message) : ie();
            });
          }
        }
    }, _t = (O) => {
      O.key === "Enter" && n("enter", l.value);
    }, ie = (O = "right", X = "") => {
      O === "error" ? (c.value = "var(--a-error-color)", h.value = "var(--a-error-color)", i.value = "var(--a-error-color)", v.value = "var(--a-error-color)", b(X), $.value(1, 0.2)) : (c.value = "var(--a-primary-color)", h.value = "var(--a-border-color)", i.value = "var(--a-primary-color)", v.value = "var(--a-primary-color)", $.value(0, 0.2));
    };
    return T.$on(`change-input-style-${k}-${o}`, (O = "right", X = "") => {
      ie(O, X);
    }), T.$on(`reset-input-value-${k}-${o}`, () => {
      e.isSelector || (l.value = w[o], n("update:modelValue", l.value)), n("resetValue", w[o]), ie();
    }), xe(() => {
      T.$off(`reset-input-value-${k}-${o}`);
    }), a({
      setInputStatusStyle: ie
    }), () => s("div", {
      class: "a-input-content",
      style: {
        "--border-focus-shadow": d.value ? v.value : "",
        "--input-focus-opacity": d.value ? 0.2 : 1,
        cursor: e.disabled ? "no-drop" : ""
      }
    }, [s("div", {
      class: "a-input-wrapper",
      style: {
        backgroundColor: e.disabled ? "var(--a-bg-grey-color)" : "",
        pointerEvents: e.disabled ? "none" : "auto",
        "--border-focus-color": c.value,
        "--border-color": h.value,
        "--border-hover-color": i.value
      },
      ref: m
    }, [z(s("input", {
      style: L.value,
      placeholder: e.placeholder,
      class: "input",
      onInput: B,
      readonly: e.readonly,
      onFocus: (O) => P(O),
      onBlur: (O) => N(O),
      onKeydown: (O) => _t(O),
      disabled: e.disabled,
      type: r.value,
      "onUpdate:modelValue": (O) => l.value = O,
      ref: y
    }, null), [[Dt, l.value]])]), z(s("div", {
      class: "a-input-slot",
      style: {
        backgroundColor: e.disabled ? "var(--a-bg-grey-color)" : ""
      }
    }, [de()]), [[Y, H.value]])]);
  }
}), nn = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), Ee = nn(tn);
const ln = /* @__PURE__ */ S({
  name: "ADateInput",
  props: {
    value: {
      type: String,
      default: ""
    },
    showDateSelect: {
      type: Boolean,
      default: !1
    },
    shrinkCalendarSwitchFn: Function,
    showDateSelectFn: Function
  },
  emits: ["inputBlur", "inputFoucs", "resetValue"],
  components: {},
  setup(e, {
    emit: n
  }) {
    const t = () => {
      e.shrinkCalendarSwitchFn(1, 0.18);
    };
    return () => s("div", {
      class: "a-date-selector-input"
    }, [s(Ee, {
      width: "200",
      readonly: !0,
      isDate: !0,
      modelValue: e.value,
      onResetValue: (a) => n("resetValue", a),
      onFocus: () => t(),
      onBlur: () => n("inputBlur")
    }, null)]);
  }
}), an = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), qe = an(ln), on = (e, n) => e.findIndex((t) => t === n), sn = (e, n) => {
  let t = [], a = [];
  return e.forEach((l) => {
    a.length === 0 && t.push(a), a.push(l), a.length === n && (a = []);
  }), t;
}, rn = (e, n) => {
  let t = null;
  return (a) => {
    t !== null && clearTimeout(t), t = setTimeout(() => {
      e.call(a), t = null;
    }, n);
  };
}, we = () => {
  function e() {
    return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
  }
  return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e() + Date.now();
}, He = (e, n = /* @__PURE__ */ new Map()) => {
  if (typeof e == "object" && e !== null) {
    const t = n.get(e);
    if (t)
      return t;
    const a = Array.isArray(e), l = a ? [] : {};
    return n.set(e, l), a ? e.forEach((o, r) => {
      l[r] = He(e[r], n);
    }) : Object.keys(e).forEach((o) => {
      l[o] = He(e[o], n);
    }), l;
  } else
    return e;
}, Xe = (e, n) => {
  let t = [];
  for (let a = 0; a < n; a++)
    t.push(e), e += 1;
  return t;
}, Ce = (e, n) => {
  const t = window.getComputedStyle(e, null);
  return parseFloat(t.getPropertyValue(n));
};
function un(e, n) {
  return new Date(e, n - 1, 1).getDay();
}
function Ye(e, n) {
  return new Date(e, n, 0).getDate();
}
function mt(e, n) {
  const t = un(e, n);
  let a = Ye(e, n - 1), l = [];
  for (; l.length < t; )
    l.push(a), a = a - 1;
  return l.reverse();
}
function cn(e, n) {
  const t = mt(e, n), l = 42 - (Ye(e, n) + t.length);
  let o = [];
  for (let r = 1; r <= l; r++)
    o.push(r);
  return o;
}
function Ke(e) {
  const n = e ? new Date(e) : /* @__PURE__ */ new Date();
  return [n.getFullYear(), n.getMonth() + 1, n.getDate()];
}
function dn(e, n, t) {
  const a = [e, n, t];
  for (let l = 1; l < a.length; l++)
    a[l] < 10 && (a[l] = "0" + a[l]);
  return a.join("-");
}
const fn = ["日", "一", "二", "三", "四", "五", "六"], hn = (e, n) => {
  const t = mt(e, n), a = Ye(e, n), l = cn(e, n), o = [], [r, u, f] = Ke();
  for (let c = 1; c <= a; c++) {
    const h = r === e && u === n && f === c;
    o.push({
      day: c,
      style: h ? "day current-day current" : "day current-day",
      isRestDay: !1,
      year: e,
      month: n
    });
  }
  const d = [
    ...Qe("last", t, e, n),
    ...o,
    ...Qe("next", l, e, n)
  ];
  return [
    fn,
    d,
    sn(d, 7)
  ];
}, Qe = (e, n, t, a) => {
  let l = [];
  return n.forEach((o) => {
    const r = {
      day: o,
      style: "day rest-day",
      isRestDay: !0,
      year: t,
      month: a
    };
    if (e === "last") {
      if (a === 1) {
        r.year = t - 1;
        return;
      }
      r.month--;
    } else {
      if (a === 12) {
        r.year = t + 1;
        return;
      }
      r.month++;
    }
    l.push(r);
  }), l;
};
const mn = /* @__PURE__ */ S({
  name: "ACalendar",
  props: {
    dateValue: {
      type: String,
      default: ""
    }
  },
  setup(e, {
    emit: n
  }) {
    const t = D("dateState"), a = D("update-modelValue"), l = j({
      weekDays: [],
      CalendarItemChunkArr: [],
      CalendarItemObjArr: []
    });
    I(() => t, () => {
      o();
    }, {
      deep: !0
    }), ve(() => {
      o();
    });
    const o = () => {
      const {
        currentYear: f,
        currentMonth: d
      } = t, [c, h, i] = hn(f, d);
      l.weekDays = c, l.CalendarItemChunkArr = i, l.CalendarItemObjArr = h;
    }, r = (f) => {
      let d;
      if (e.dateValue !== "") {
        const [c, h, i] = Ke(e.dateValue);
        c === f.year && h === f.month && i === f.day && (d = !0);
      } else
        d = !1;
      return d;
    }, u = (f) => f.map((d) => {
      const {
        day: c,
        style: h
      } = d, i = r(d);
      return s("td", {
        onClick: () => a(d),
        class: h
      }, [s("div", {
        class: i && "checked-day"
      }, [c])]);
    });
    return () => s("div", {
      class: "a-calendar-content"
    }, [s("table", null, [s("thead", null, [s("tr", null, [l.weekDays.map((f) => s("th", null, [f]))])]), s("tbody", null, [l.CalendarItemChunkArr.map((f) => s("tr", null, [u(f)]))])])]);
  }
}), vn = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), vt = vn(mn);
const pn = /* @__PURE__ */ S({
  name: "AScrollbar",
  emits: [],
  props: {
    trigger: {
      type: String,
      default: "hover"
    },
    xScrollable: {
      type: Boolean,
      default: !1
    },
    onScroll: {
      type: Function
    },
    size: Number
  },
  setup(e, {
    emit: n,
    slots: t
  }) {
    const a = p(), l = p(), o = p(), r = p(), u = p(), f = p(!1), d = p(!1), c = p(!0), h = p(!0), i = p(0), v = p(0), m = p(0), y = p(0), C = p("vertical");
    F(() => {
      k(), document.addEventListener("mousemove", _), document.addEventListener("mouseup", L);
    }), ft(() => {
      document.removeEventListener("mousemove", _), document.removeEventListener("mouseup", L);
    });
    const k = () => {
      ue(() => {
        g(), w();
      });
    }, g = () => {
      const {
        clientHeight: E,
        scrollHeight: B
      } = a.value;
      if (E === B) {
        c.value = !1;
        return;
      }
      const N = E / B * 100 + "%";
      o.value.style.height = N, e.trigger === "hover" && (l.value.style.opacity = "0");
    }, w = () => {
      if (e.xScrollable) {
        const {
          clientWidth: E,
          scrollWidth: B
        } = a.value;
        if (E === B) {
          h.value = !1;
          return;
        }
        const N = E / B * 100 + "%";
        u.value.style.width = N, e.trigger === "hover" && (r.value.style.opacity = "0");
      }
    }, b = (E) => {
      const B = a.value, N = l.value, P = o.value;
      if (e.onScroll && e.onScroll(E), !B || !N || !P)
        return;
      const te = B.scrollTop / (B.scrollHeight - B.clientHeight), re = N.clientHeight, ne = P.clientHeight, le = te * (re - ne);
      P.style.top = `${le}px`;
    }, $ = (E, B) => {
      C.value = B, f.value = !0, B === "vertical" ? (i.value = E.clientY, v.value = o.value.offsetTop) : (m.value = E.clientX, y.value = u.value.offsetLeft);
    }, _ = (E) => {
      if (!f.value)
        return;
      const B = a.value;
      if (C.value === "vertical") {
        const N = l.value, P = o.value, te = B.clientHeight, re = E.clientY - i.value, ne = N.clientHeight, le = Math.min(Math.max(0, v.value + re), ne - P.clientHeight), ce = le / (ne - P.clientHeight), de = B.scrollHeight - te;
        B.scrollTop !== ce * de && (B.scrollTop = ce * de), P.style.top = `${le}px`;
      } else {
        const N = r.value, P = u.value, te = B.clientWidth, re = E.clientX - m.value, ne = N.clientWidth, le = Math.min(Math.max(0, y.value + re), ne - P.clientWidth), ce = le / (ne - P.clientWidth), de = B.scrollWidth - te;
        B.scrollLeft !== ce * de && (B.scrollLeft = ce * de), P.style.left = `${le}px`;
      }
    }, L = () => {
      f.value !== !1 && (f.value = !1, l.value && !d.value && e.trigger !== "none" && (e.xScrollable ? r.value.style.opacity = "0" : l.value.style.opacity = "0"));
    }, H = () => {
      e.trigger !== "none" && (d.value = !0, c.value && (l.value.style.opacity = "1"), h.value && e.xScrollable && (r.value.style.opacity = "1"));
    }, K = () => {
      e.trigger !== "none" && (d.value = !1, f.value || (c.value && (l.value.style.opacity = "0"), h.value && e.xScrollable && (r.value.style.opacity = "0")));
    };
    return () => s("div", {
      class: "a-scrollbar",
      onMouseenter: H,
      onMouseleave: K
    }, [s("div", {
      class: "a-scrollbar-container",
      ref: a,
      onScroll: (E) => b(E)
    }, [s("div", {
      class: "a-scrollbar-content",
      style: {
        width: e.xScrollable ? "fit-content" : "none"
      }
    }, [t.default && t.default()])]), c.value && s("div", {
      ref: l,
      class: ["a-scrollbar-rail", "a-scrollbar-rail--vertical"]
    }, [s("div", {
      class: "a-scrollbar-rail__scrollbar",
      ref: o,
      onMousedown: (E) => $(E, "vertical")
    }, null)]), e.xScrollable && h.value && s("div", {
      ref: r,
      class: ["a-scrollbar-rail", "a-scrollbar-rail--horizontal"]
    }, [s("div", {
      class: "a-scrollbar-rail__scrollbar",
      ref: u,
      onMousedown: (E) => $(E, "horizontal")
    }, null)])]);
  }
}), gn = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), Re = gn(pn);
const yn = /* @__PURE__ */ S({
  name: "ADateSelect",
  props: {
    dateValue: {
      type: String,
      default: ""
    },
    currentYear: Number,
    currentMonth: Number,
    updateYearOrMonthFn: Function
  },
  setup(e, {
    emit: n
  }) {
    const t = D("dateSelectContentKey"), a = p(), l = p(), o = j({
      selectYear: Xe(1901, 200),
      selectMonth: Xe(1, 12)
    }), r = (c, h) => {
      const i = a.value.$el.querySelector(".a-scrollbar-container"), v = l.value.$el.querySelector(".a-scrollbar-container"), m = a.value.$el.querySelector(`.select-year-index-${c}`), y = l.value.$el.querySelector(`.select-month-index-${h}`);
      i.scrollTo({
        behavior: "smooth",
        top: m.offsetTop
      }), v.scrollTo({
        behavior: "smooth",
        top: y.offsetTop
      });
    }, u = (c) => {
      e.updateYearOrMonthFn("year", c), r(c, e.currentMonth);
    }, f = (c) => {
      e.updateYearOrMonthFn("month", c), r(e.currentYear, c);
    }, d = (c, h) => c === "year" ? e.currentYear === h : e.currentMonth === h;
    return () => s("div", {
      class: "a-date-select-content",
      id: t
    }, [s(Re, {
      style: {
        height: "248px"
      },
      ref: a
    }, {
      default: () => [s("div", {
        class: "select-year"
      }, [o.selectYear.map((c, h) => s("div", {
        onClick: () => u(c),
        key: h,
        class: `year select-year-index-${c} ${d("year", c) && "current"}`
      }, [c]))])]
    }), s(Re, {
      style: {
        height: "248px"
      },
      ref: l
    }, {
      default: () => [s("div", {
        class: "select-month"
      }, [o.selectMonth.map((c, h) => s("div", {
        onClick: () => f(c),
        key: h,
        class: `month select-month-index-${c} ${d("month", c) && "current"}`
      }, [c])), s("div", {
        style: "height:212px"
      }, null)])]
    })]);
  }
}), bn = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), wn = bn(yn);
var Je;
const pt = typeof window < "u", kn = (e) => typeof e == "string", gt = () => {
}, Sn = pt && ((Je = window == null ? void 0 : window.navigator) == null ? void 0 : Je.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function yt(e) {
  return typeof e == "function" ? e() : fe(e);
}
function $n(e) {
  return e;
}
function Cn(e) {
  return Et() ? (Bt(e), !0) : !1;
}
function Se(e) {
  var n;
  const t = yt(e);
  return (n = t == null ? void 0 : t.$el) != null ? n : t;
}
const bt = pt ? window : void 0;
function Fe(...e) {
  let n, t, a, l;
  if (kn(e[0]) || Array.isArray(e[0]) ? ([t, a, l] = e, n = bt) : [n, t, a, l] = e, !n)
    return gt;
  Array.isArray(t) || (t = [t]), Array.isArray(a) || (a = [a]);
  const o = [], r = () => {
    o.forEach((c) => c()), o.length = 0;
  }, u = (c, h, i, v) => (c.addEventListener(h, i, v), () => c.removeEventListener(h, i, v)), f = I(() => [Se(n), yt(l)], ([c, h]) => {
    r(), c && o.push(...t.flatMap((i) => a.map((v) => u(c, i, v, h))));
  }, { immediate: !0, flush: "post" }), d = () => {
    f(), r();
  };
  return Cn(d), d;
}
let Ze = !1;
function wt(e, n, t = {}) {
  const { window: a = bt, ignore: l = [], capture: o = !0, detectIframe: r = !1 } = t;
  if (!a)
    return;
  Sn && !Ze && (Ze = !0, Array.from(a.document.body.children).forEach((i) => i.addEventListener("click", gt)));
  let u = !0;
  const f = (i) => l.some((v) => {
    if (typeof v == "string")
      return Array.from(a.document.querySelectorAll(v)).some((m) => m === i.target || i.composedPath().includes(m));
    {
      const m = Se(v);
      return m && (i.target === m || i.composedPath().includes(m));
    }
  }), c = [
    Fe(a, "click", (i) => {
      const v = Se(e);
      if (!(!v || v === i.target || i.composedPath().includes(v))) {
        if (i.detail === 0 && (u = !f(i)), !u) {
          u = !0;
          return;
        }
        n(i);
      }
    }, { passive: !0, capture: o }),
    Fe(a, "pointerdown", (i) => {
      const v = Se(e);
      v && (u = !i.composedPath().includes(v) && !f(i));
    }, { passive: !0 }),
    r && Fe(a, "blur", (i) => {
      var v;
      const m = Se(e);
      ((v = a.document.activeElement) == null ? void 0 : v.tagName) === "IFRAME" && !(m != null && m.contains(a.document.activeElement)) && n(i);
    })
  ].filter(Boolean);
  return () => c.forEach((i) => i());
}
const et = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, tt = "__vueuse_ssr_handlers__";
et[tt] = et[tt] || {};
var nt;
(function(e) {
  e.UP = "UP", e.RIGHT = "RIGHT", e.DOWN = "DOWN", e.LEFT = "LEFT", e.NONE = "NONE";
})(nt || (nt = {}));
var Vn = Object.defineProperty, lt = Object.getOwnPropertySymbols, In = Object.prototype.hasOwnProperty, xn = Object.prototype.propertyIsEnumerable, at = (e, n, t) => n in e ? Vn(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, An = (e, n) => {
  for (var t in n || (n = {}))
    In.call(n, t) && at(e, t, n[t]);
  if (lt)
    for (var t of lt(n))
      xn.call(n, t) && at(e, t, n[t]);
  return e;
};
const _n = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};
An({
  linear: $n
}, _n);
const Dn = (e, n, t) => {
  let a = 0, l = 0, o = t;
  if (!e)
    return {
      placement: o,
      top: a,
      left: l
    };
  const r = n, u = e.getBoundingClientRect();
  switch (o) {
    case "top":
      u.top < r.clientHeight && (o = "bottom");
      break;
    case "bottom":
      window.innerHeight - u.bottom < r.clientHeight && (o = "top");
      break;
    case "left":
      u.left < r.clientWidth && (o = "right");
      break;
    case "right":
      window.innerWidth - u.right < r.clientWidth && (o = "left");
      break;
    default:
      o = t;
  }
  switch (o) {
    case "top":
      a = u.top - r.offsetHeight - 5, l = u.left + (u.width - r.offsetWidth) / 2;
      break;
    case "bottom":
      a = u.bottom + 5, l = u.left + (u.width - r.offsetWidth) / 2;
      break;
    case "left":
      a = u.top + (u.height - r.offsetHeight) / 2, l = u.left - r.offsetWidth - 5;
      break;
    case "right":
      a = u.top + (u.height - r.offsetHeight) / 2, l = u.right + 5;
      break;
    default:
      l = 0, a = 0;
  }
  return {
    placement: o,
    top: a,
    left: l
  };
};
const Oe = () => {
  let e = 2e3, n = [];
  const t = document.querySelectorAll(".a-popover");
  return t.length > 0 && (t.forEach((a) => {
    const l = Number(a.style.zIndex);
    n.push(l);
  }), n.length > 0 && (e = Math.max(...n) + 1)), e;
}, kt = /* @__PURE__ */ S({
  name: "APopover",
  props: {
    visible: {
      type: Boolean,
      default: null
    },
    trigger: {
      type: String,
      default: "hover"
    },
    title: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    },
    placement: {
      type: String,
      default: "bottom"
    },
    width: {
      type: String,
      default: "150px"
    },
    padding: {
      type: String,
      default: "12px"
    }
  },
  emits: ["isClickElementInPopover"],
  setup(e, {
    emit: n,
    slots: t,
    expose: a
  }) {
    let l = null;
    const o = p(null), r = p(null), u = p(2e3), f = p("var(--a-bg-color)"), d = p("bottom"), c = p(!1), h = p(e.visible), i = p({
      left: 0,
      top: 0
    });
    I(() => e.visible, ($) => {
      m(r.value.firstElementChild, e.placement), setTimeout(() => {
        h.value = $;
      }, $ ? 120 : 0);
    });
    const v = A(() => {
      let $ = "", _ = "";
      switch (d.value) {
        case "bottom":
          $ = "scaleY", _ = "center top";
          break;
        case "left":
          $ = "scaleX", _ = "right";
          break;
        case "top":
          $ = "scaleY", _ = "center bottom";
          break;
        case "right":
          $ = "scaleX", _ = "left";
          break;
      }
      let L = h.value === null ? c.value : h.value;
      return {
        zIndex: u.value,
        left: i.value.left + "px",
        top: i.value.top + "px",
        backgroundColor: f.value,
        transition: `transform ${L ? 0.18 : 0.1}s ease`,
        transform: `${$}(${L ? 1 : 0})`,
        // 面板收起
        transformOrigin: _,
        width: e.width,
        minWidth: e.width || "150px",
        padding: e.padding
      };
    }), m = ($, _) => {
      const {
        top: L,
        left: H,
        placement: K
      } = Dn($, o.value, _);
      d.value = K, i.value = {
        top: L,
        left: H
      };
    }, C = rn(() => m(r.value.firstElementChild, e.placement), 0);
    F(() => {
      setTimeout(() => {
        u.value = Oe();
      });
      const $ = r.value.firstElementChild;
      e.trigger === "click" ? ($.addEventListener("click", k), wt($, (_) => {
        var K;
        const L = _.target, H = (K = o.value) == null ? void 0 : K.contains(L);
        n("isClickElementInPopover", H), L.className === "a-popover" || H || g();
      })) : e.trigger === "hover" && ($.addEventListener("mouseenter", k), $.addEventListener("mouseleave", g), o.value.addEventListener("mouseenter", k), o.value.addEventListener("mouseleave", g)), m(r.value.firstElementChild, e.placement), window.addEventListener("resize", C), window.addEventListener("scroll", C);
    }), xe(() => {
      const $ = r.value.firstElementChild;
      window.removeEventListener("scroll", C), $.removeEventListener("mouseenter", k), $.removeEventListener("mouseleave", g), $.removeEventListener("click", k), o.value.removeEventListener("mouseenter", k), o.value.removeEventListener("mouseleave", g);
    });
    const k = () => {
      h.value === null && l && (clearTimeout(l), l = null), m(r.value.firstElementChild, e.placement), c.value = !0;
    }, g = () => {
      h.value === null ? l = setTimeout(() => {
        c.value = !1, l = null;
      }, 250) : c.value = !1;
    }, w = () => t.reference ? t.reference() : "", b = () => s("div", {
      class: "a-popover-inner-content"
    }, [z(s("div", {
      class: "title"
    }, [e.title]), [[Y, e.title]]), z(s("div", {
      class: "content"
    }, [t.default && t.default() || e.content]), [[Y, t.default || e.content]])]);
    return a({
      showPopover: k,
      hiddenPopover: g,
      popoverRef: o
    }), () => s("div", {
      class: "a-popover-content"
    }, [s("div", {
      class: "a-reference",
      ref: r
    }, [w()]), s(Le, {
      to: "body"
    }, {
      default: () => [s("div", {
        ref: o,
        class: "a-popover",
        style: v.value
      }, [b()])]
    })]);
  }
}), En = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), Ve = En(kt);
let ye = /* @__PURE__ */ function(e) {
  return e.TYPE_YEAR = "year", e.TYPE_MONTH = "month", e;
}({}), be = /* @__PURE__ */ function(e) {
  return e.FLAG_ADD = "add", e.FLAG_DECREASE = "decrease", e;
}({});
const Bn = /* @__PURE__ */ S({
  name: "ADateMenu",
  props: {
    dateValue: {
      type: String,
      default: ""
    },
    showDateSelect: {
      type: Boolean,
      default: !1
    },
    isInputBlur: Boolean,
    showDateSelectFn: Function
  },
  emits: [],
  setup(e, {
    emit: n
  }) {
    D("dateSelectContentKey");
    const t = p(null), a = p(), l = j({
      currentYear: 0,
      currentMonth: 0,
      currentDate: 0
    });
    I(() => e.dateValue, () => {
      o();
    }), I(() => e.isInputBlur, (h) => {
      o();
    });
    const o = () => {
      const [h, i, v] = Ke(e.dateValue);
      l.currentYear = h, l.currentMonth = i, l.currentDate = v;
    };
    o();
    const r = (h, i) => {
      switch (h) {
        case ye.TYPE_YEAR:
          i === be.FLAG_ADD ? l.currentYear++ : l.currentYear--;
          break;
        case ye.TYPE_MONTH:
          if (i === be.FLAG_ADD) {
            if (l.currentMonth === 12) {
              l.currentMonth = 1, l.currentYear++;
              return;
            }
            l.currentMonth++;
          } else {
            if (l.currentMonth === 1) {
              l.currentMonth = 12, l.currentYear--;
              return;
            }
            l.currentMonth--;
          }
          break;
      }
    }, u = () => {
      if (e.showDateSelect) {
        e.showDateSelectFn(!1);
        return;
      } else
        e.showDateSelectFn(!0);
      const {
        popoverRef: h
      } = a.value, i = h.querySelectorAll(".a-scrollbar-container"), v = i[0].querySelector(`.select-year-index-${l.currentYear}`), m = i[1].querySelector(`.select-month-index-${l.currentMonth}`);
      i[0].scrollTo({
        top: v.offsetTop
      }), i[1].scrollTo({
        top: m.offsetTop
      });
    }, f = (h, i) => {
      h === "year" ? l.currentYear = i : l.currentMonth = i;
    }, d = (h) => {
      h || e.showDateSelectFn(!1);
    }, c = p(!1);
    return setTimeout(() => {
      c.value = !0;
    }), M("dateState", l), () => s("div", {
      class: "a-date-menu",
      ref: t
    }, [s("div", {
      class: "a-date-menu-head"
    }, [s("div", {
      class: "head-left"
    }, [s("span", {
      onClick: () => r(ye.TYPE_YEAR, be.FLAG_DECREASE),
      class: "two iconfont icon-doubleleft"
    }, null), s("span", {
      onClick: () => r(ye.TYPE_MONTH, be.FLAG_DECREASE),
      class: "one iconfont icon-left1"
    }, null)]), s("div", {
      class: "head-center"
    }, [c.value && s(Ve, {
      onIsClickElementInPopover: (h) => d(h),
      ref: a,
      trigger: "click",
      visible: e.showDateSelect,
      width: "max-content",
      padding: "0"
    }, {
      reference: () => s("div", {
        onClick: () => u(),
        tabindex: "1",
        style: {
          backgroundColor: e.showDateSelect ? "var(--a-bg-hover-color)" : ""
        },
        class: "year-month"
      }, [l.currentYear, ae(" "), l.currentMonth, ae("月")]),
      default: () => s(wn, {
        updateYearOrMonthFn: f,
        currentYear: l.currentYear,
        currentMonth: l.currentMonth,
        dateValue: e.dateValue
      }, null)
    })]), s("div", {
      class: "head-right"
    }, [s("span", {
      onClick: () => r(ye.TYPE_MONTH, be.FLAG_ADD),
      class: "one iconfont icon-right-copy"
    }, null), s("span", {
      onClick: () => r(ye.TYPE_YEAR, be.FLAG_ADD),
      class: "two iconfont icon-doubleright-copy"
    }, null)])]), s("div", {
      class: "a-date-menu-body"
    }, [s(vt, {
      dateValue: e.dateValue
    }, null)])]);
  }
});
const Mn = /* @__PURE__ */ S({
  name: "ADatePicker",
  props: {
    modelValue: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue"],
  components: {
    DateInput: qe,
    Calendar: vt
  },
  setup(e, {
    emit: n
  }) {
    const t = we(), a = we(), l = p(!0), o = p(!1), r = p(null), u = (i, v = !0) => {
      const {
        year: m,
        month: y,
        day: C
      } = i, k = dn(m, y, C);
      n("update:modelValue", k), v && f(0);
    }, f = (i) => {
      l.value = i === 0;
    }, d = (i) => {
      typeof i == "boolean" && (o.value = i);
    }, c = (i) => {
      !i && !o.value && (l.value = !0);
    }, h = (i) => {
      n("update:modelValue", i);
    };
    return M("model-value", e.modelValue), M("update-modelValue", u), M("dateSelectContentKey", a), () => s("div", {
      class: "a-datepicker-content",
      id: `${t}`,
      ref: r
    }, [s(Ve, {
      trigger: "click",
      visible: !l.value,
      width: "max-content",
      padding: "0",
      onIsClickElementInPopover: (i) => c(i)
    }, {
      reference: () => s(qe, {
        showDateSelect: o.value,
        showDateSelectFn: d,
        shrinkCalendarSwitchFn: f,
        value: e.modelValue,
        onResetValue: (i) => h(i)
      }, null),
      default: () => s(Bn, {
        showDateSelectFn: d,
        showDateSelect: o.value,
        dateValue: e.modelValue,
        isInputBlur: l.value
      }, null)
    })]);
  }
}), Tn = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), Rn = Tn(Mn);
const Ln = /* @__PURE__ */ S({
  name: "AForm",
  props: {
    model: {
      type: Object,
      default: {}
    },
    rules: {
      type: Object,
      default: {}
    }
  },
  emits: ["submit"],
  setup(e, {
    emit: n,
    slots: t,
    expose: a
  }) {
    let l = null;
    const o = we(), r = p(null), u = JSON.parse(JSON.stringify(e.model));
    M("model", u), M("rules", e.rules), M("uniKey", o), F(() => {
      l = new IntersectionObserver((h) => {
        h[0].isIntersecting && f();
      }), l.observe(r.value);
    }), ft(() => {
      l == null || l.disconnect(), l = null;
    });
    const f = () => {
      const h = r.value.querySelectorAll(".a-form-item-label");
      let i = 0;
      h.forEach((v) => {
        const m = Ce(v, "width");
        m > i && (i = m);
      }), h.forEach((v) => {
        v.style.width = i + "px";
      });
    };
    return a({
      validate: () => new Promise((h, i) => {
        let v = !0;
        const m = `change-input-style-${o}-`;
        Object.keys(e.rules).forEach((y) => {
          for (let C = 0; C < e.rules[y].length; C++) {
            const k = e.rules[y][C], g = e.model[y] + "";
            if (k.required === !0)
              if (g === "") {
                T.$emit(m + y, "error", k.message), i(k.message), v = !1;
                return;
              } else
                T.$emit(m + y);
            if (k.min || k.max)
              if (g.length < k.min || g.length > k.max) {
                T.$emit(m + y, "error", k.message), i(k.message), v = !1;
                return;
              } else
                T.$emit(m + y);
            k.validator && typeof k.validator == "function" && k.validator(k, g, (w) => {
              if (w) {
                T.$emit(m + y, "error", w.message), i(w.message), v = !1;
                return;
              } else
                T.$emit(m + y);
            });
          }
        }), v && h(v);
      }),
      resetFields: () => {
        const h = `reset-input-value-${o}-`;
        Object.keys(e.model).forEach((i) => {
          T.$emit(h + i);
        });
      }
    }), () => s("div", {
      class: "a-form-content",
      ref: r
    }, [t.default()]);
  }
}), Pn = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), On = Pn(Ln);
const Nn = S({
  name: "AShrinkBox",
  props: {
    shrinkViewSwitch: Function,
    contentID: String,
    zIndex: {
      type: String,
      default: "9999"
    }
  },
  emits: ["shrink"],
  setup(e, { emit: n, slots: t }) {
    const a = p(null);
    F(() => {
      l(), e.shrinkViewSwitch(o);
    });
    const l = () => {
      const r = document.getElementById(
        `${e.contentID}`
      );
      r && wt(r, () => {
        o(
          0
          /* COLSE */
        );
      });
    }, o = (r, u) => {
      a.value.style.transition = "all 0.2s ease", a.value.style.transform = `scaleY(${r})`, n("shrink", r);
    };
    return {
      shrinkRef: a
    };
  }
}), W = (e, n) => {
  const t = e.__vccOpts || e;
  for (const [a, l] of n)
    t[a] = l;
  return t;
};
function Fn(e, n, t, a, l, o) {
  return V(), R("div", {
    ref: "shrinkRef",
    class: "a-shrink-box",
    style: oe(`z-index:${e.zIndex}`)
  }, [
    Pe(e.$slots, "default")
  ], 4);
}
const Hn = /* @__PURE__ */ W(Nn, [["render", Fn]]), zn = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), St = zn(Hn);
const Wn = /* @__PURE__ */ S({
  name: "AFormItem",
  props: {
    label: {
      type: String,
      default: ""
    },
    prop: {
      type: String,
      default: null
    }
  },
  emits: [],
  setup(e, {
    emit: n,
    slots: t
  }) {
    M("prop", e.prop);
    const a = D("model"), l = p("Please enter the content first"), o = p(null), r = p();
    M("shrinkFormErrorSwitchFn", r), M("changeErrorMessage", (d) => {
      l.value = d;
    }), F(() => {
    });
    const u = A(() => Object.keys(a).includes(e.prop)), f = (d) => {
      r.value = d;
    };
    return () => s("div", {
      class: "a-form-item-content"
    }, [s("label", {
      class: "a-form-item-label",
      ref: o
    }, [u.value && s("span", {
      class: "iconfont icon-bitian"
    }, null), e.label]), s("div", {
      class: "a-form-item-slot"
    }, [t.default(), s(St, {
      shrinkViewSwitch: f,
      zIndex: "0"
    }, {
      default: () => [s("div", {
        class: "a-form-item-error"
      }, [l.value])]
    })])]);
  }
}), Yn = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), Kn = Yn(Wn);
const jn = S({
  name: "SelectInput",
  props: {
    placeholder: {
      type: String,
      default: "请选择"
    },
    inputValue: {
      type: String
    },
    isSearch: {
      type: Boolean,
      default: !1
    },
    width: {
      type: String,
      default: ""
    }
  },
  emits: ["searchOptions", "blurInitValue", "resetValue"],
  components: {
    AInput: Ee
  },
  setup(e, { emit: n }) {
    const t = p(e.inputValue), a = D("shrinkSelectMenuFn", () => {
    }), l = D("updateInputValue", () => {
    }), o = D("updateLocalValue", () => {
    }), r = (c) => {
      const i = c.target.value;
      n("searchOptions", i);
    };
    return I(
      () => e.inputValue,
      (c) => {
        t.value = c;
      }
    ), {
      value: t,
      setValue: () => {
        o();
      },
      resetValue: (c) => {
        n("resetValue", c);
      },
      searchOptions: r,
      updateInputValue: l,
      firstBurlSearch: () => {
        a(!0), n("searchOptions", "");
      }
    };
  }
}), Un = { class: "a-selector-input" };
function Gn(e, n, t, a, l, o) {
  const r = q("AInput");
  return V(), R("div", Un, [
    s(r, {
      modelValue: e.value,
      "onUpdate:modelValue": n[0] || (n[0] = (u) => e.value = u),
      isSelector: "",
      isSearch: e.isSearch,
      readonly: !e.isSearch,
      placeholder: e.placeholder,
      width: e.width,
      onInput: e.searchOptions,
      onFocus: e.firstBurlSearch,
      onBlur: n[1] || (n[1] = (u) => e.setValue()),
      onResetValue: e.resetValue,
      onChange: n[2] || (n[2] = (u) => e.updateInputValue(u))
    }, null, 8, ["modelValue", "isSearch", "readonly", "placeholder", "width", "onInput", "onFocus", "onResetValue"])
  ]);
}
const qn = /* @__PURE__ */ W(jn, [["render", Gn]]);
const Xn = S({
  name: "DataTip",
  components: {},
  directives: {},
  emits: [],
  setup(e, { emit: n }) {
    return {};
  }
}), Qn = { class: "no-data-tip" };
function Jn(e, n, t, a, l, o) {
  return V(), R("div", Qn, "未找到匹配的内容");
}
const Zn = /* @__PURE__ */ W(Xn, [["render", Jn]]);
const el = S({
  name: "SelectorMenu",
  components: {
    NoDataTip: Zn
  },
  props: {
    inputValue: String,
    options: {
      type: Array,
      default: () => [
        {
          value: "1",
          text: "选项一"
        },
        {
          value: "2",
          text: "选项二"
        },
        {
          value: "3",
          text: "选项三"
        }
      ]
    },
    localValue: {
      type: String,
      defualt: ""
    },
    searchValue: {
      type: String,
      default: ""
    },
    isSearch: {
      type: Boolean
    }
  },
  emits: ["setItemValue"],
  setup(e, { emit: n }) {
    const t = p([]), a = D("shrinkSelectMenuFn", () => {
    });
    F(() => {
      t.value = e.options;
    }), I(
      () => e.searchValue,
      (r) => {
        e.isSearch && l(r);
      },
      { deep: !0 }
    );
    const l = (r) => {
      if (r.length === 0) {
        t.value = e.options;
        return;
      }
      t.value = e.options.filter((u) => u.text.toLowerCase().includes(r.trim().toLowerCase()));
    };
    return {
      setItemValue: (r) => {
        n("setItemValue", r), a(!1);
      },
      searchData: t
    };
  }
}), tl = { class: "selector-menu" }, nl = ["onClick"], ll = { class: "label" };
function al(e, n, t, a, l, o) {
  const r = q("AIcon"), u = q("NoDataTip"), f = q("AScrollbar");
  return V(), J(f, { style: { "max-height": "215px", "max-width": "223px" } }, {
    default: U(() => [
      x("div", tl, [
        e.searchData.length > 0 ? (V(!0), R(se, { key: 0 }, Ae(e.searchData, (d, c) => (V(), R("div", {
          class: Z(`menu-item ${e.localValue === d.text ? "menu-checked" : ""}`),
          onClick: (h) => e.setItemValue(d),
          onMousedown: n[0] || (n[0] = () => {
          }),
          key: c
        }, [
          x("div", ll, ee(d && d.text), 1),
          z(s(r, { name: "select-bold" }, null, 512), [
            [Y, e.localValue === d.text]
          ])
        ], 42, nl))), 128)) : (V(), J(u, { key: 1 }))
      ])
    ]),
    _: 1
  });
}
const ol = /* @__PURE__ */ W(el, [["render", al]]);
const sl = S({
  name: "ASelect",
  components: {
    SelectorInput: qn,
    Menu: ol,
    ShrinkBox: St,
    Popover: kt
  },
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    placeholder: {
      type: String
    },
    options: {
      type: Array
    },
    isSearch: {
      type: Boolean,
      default: !1
    },
    width: {
      type: String,
      default: "200"
    }
  },
  emits: ["setItemValue", "update:modelValue"],
  setup(e, { emit: n }) {
    const t = we(), a = p(), l = p(!1), o = j({
      inputValue: "",
      searchValue: "",
      localValue: ""
    });
    ve(() => {
      u();
    });
    const r = (i) => {
      var m;
      const v = (m = e.options) == null ? void 0 : m.find((y) => y.value == i);
      d(v);
    }, u = () => {
      const i = e.options.find(
        (v) => v.value === e.modelValue
      );
      i && (o.inputValue = i.text, o.localValue = i.text);
    }, f = (i) => {
      l.value = i;
    };
    I(
      () => e.modelValue,
      () => {
        u();
      }
    );
    const d = (i) => {
      o.inputValue = i.text, o.localValue = i.text, n("update:modelValue", i.value), n("setItemValue", i);
    };
    I(
      () => o.inputValue,
      (i) => {
        i === "" && o.localValue !== "" && setTimeout(() => {
          o.searchValue = "";
        });
      }
    );
    const c = (i) => {
      o.searchValue = i;
    }, h = (i) => {
      i || (l.value = !1);
    };
    return M("shrinkSelectMenuFn", f), M("updateInputValue", (i) => {
      o.inputValue = i;
    }), M("updateLocalValue", async (i) => {
      o.inputValue = o.localValue;
    }), {
      key: t,
      selectRef: a,
      setItemValue: d,
      searchOptions: c,
      resetValue: r,
      popoverVisible: l,
      isClickElementInPopover: h,
      ..._e(o)
    };
  }
}), rl = ["id"];
function il(e, n, t, a, l, o) {
  const r = q("SelectorInput"), u = q("Menu"), f = q("Popover");
  return V(), R("div", {
    class: "a-selector",
    id: e.key,
    ref: "selectRef"
  }, [
    s(f, {
      visible: e.popoverVisible,
      padding: "0",
      trigger: "click",
      width: Number(e.width) + 25 + "px",
      onIsClickElementInPopover: e.isClickElementInPopover
    }, {
      reference: U(() => [
        s(r, {
          placeholder: e.placeholder,
          inputValue: e.inputValue,
          localValue: e.localValue,
          isSearch: e.isSearch,
          width: e.width,
          onSearchOptions: e.searchOptions,
          onResetValue: e.resetValue
        }, null, 8, ["placeholder", "inputValue", "localValue", "isSearch", "width", "onSearchOptions", "onResetValue"])
      ]),
      default: U(() => [
        s(u, {
          onSetItemValue: e.setItemValue,
          options: e.options,
          searchValue: e.searchValue,
          inputValue: e.inputValue,
          localValue: e.localValue,
          isSearch: e.isSearch
        }, null, 8, ["onSetItemValue", "options", "searchValue", "inputValue", "localValue", "isSearch"])
      ]),
      _: 1
    }, 8, ["visible", "width", "onIsClickElementInPopover"])
  ], 8, rl);
}
const ul = /* @__PURE__ */ W(sl, [["render", il]]), cl = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), $t = cl(ul);
const dl = /* @__PURE__ */ S({
  name: "AMenu",
  props: {
    defaultActive: {
      type: String,
      default: ""
    },
    dark: {
      type: Boolean,
      default: !1
    }
  },
  setup(e, {
    emit: n,
    slots: t
  }) {
    const a = p(e.defaultActive), l = p(!0), o = (u) => {
      u !== a.value && (a.value = u);
    }, r = A(() => ({
      backgroundColor: e.dark ? "#001428" : "var(--a-bg-color)",
      overflow: (l.value, "overlay")
    }));
    return M("default-active", a), M("dark", e.dark), M("updateDefaultValue", o), () => s("nav", {
      class: "a-menu-content",
      style: r.value
    }, [s("div", {
      class: "a-menu-item-list"
    }, [t.default()])]);
  }
}), fl = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), hl = fl(dl);
const ml = /* @__PURE__ */ S({
  name: "AMenuItem",
  props: {
    index: {
      type: String,
      default: null
    },
    disable: {
      type: Boolean,
      default: !1
    },
    route: Object
  },
  setup(e, {
    emit: n,
    slots: t
  }) {
    const a = D("default-active"), l = D("dark"), o = D("updateDefaultValue"), r = A(() => a.value === e.index), u = p(null), f = p(!1);
    F(() => {
      ue(() => {
        d();
      });
    }), I(() => a.value, (v) => {
    }, {
      deep: !0
    });
    const d = () => {
      var m;
      const v = u.value.parentElement;
      if (c()) {
        f.value = !0;
        const y = (m = v == null ? void 0 : v.parentElement) == null ? void 0 : m.querySelector(".a-sub-item");
        u.value.style.paddingLeft = Ce(y, "padding-left") + 22 + "px";
      }
    }, c = () => {
      const m = u.value.parentElement.getAttribute("slot");
      return !!(m && m === "sub");
    }, h = () => r.value ? l ? "active-dark" : "active-light" : "", i = () => l ? "a-menu-item-dark" : "a-menu-item-light";
    return () => s("div", {
      ref: u,
      class: `a-menu-item ${i()} ${h()}`,
      onClick: () => o(e.index)
    }, [s("div", {
      class: "item-icon"
    }, [t.icon && t.icon()]), s("div", {
      class: "item-title"
    }, [t.default && t.default()])]);
  }
}), vl = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), pl = vl(ml);
const gl = /* @__PURE__ */ S({
  name: "ASubMenu",
  props: {
    index: {
      type: String,
      default: ""
    }
  },
  setup(e, {
    emit: n,
    slots: t
  }) {
    const a = De(), l = D("dark"), o = D("default-active"), r = p(null), u = p(null), f = p(null), d = p(null), c = p(0), h = p(!1);
    F(() => {
      c.value = u.value.offsetHeight, u.value.style.height = "0px", i(), C();
    }), I(() => o.value, () => {
      m() ? f.value.style.color = l ? "#FFFFFF" : "var(--a-primary-color)" : f.value.style.color = "";
    });
    const i = () => {
      var b;
      const g = r.value.parentElement, w = g.getAttribute("slot");
      if (w && w === "sub") {
        const $ = (b = g == null ? void 0 : g.parentElement) == null ? void 0 : b.querySelector(".a-sub-item");
        f.value.style.paddingLeft = Ce($, "padding-left") + 22 + "px";
      }
    }, v = () => {
      const g = r.value.parentElement;
      g.style.transition = "height 0.25s ease", u.value.style.height === "0px" ? (u.value.style.height = c.value + "px", g.style.height = g.offsetHeight + c.value + "px", h.value = !0) : (c.value = u.value.scrollHeight, u.value.style.height = "0px", g.style.height = g.offsetHeight - c.value + "px", h.value = !1);
    }, m = () => {
      const g = [];
      return y(g, a.slots.default), g.includes(o.value);
    }, y = (g, w) => {
      w && w().forEach((b) => {
        b.children.default && y(g, b.children.default), b.props && g.push(b.props.index);
      });
    }, C = () => {
      m() && (f.value.style.color = l ? "#FFFFFF" : "var(--a-primary-color)", h.value = !0, u.value.style.height = c.value + "px"), ue(() => {
        d.value.style.transition = "transform 0.2s ease", f.value.style.transition = "color 0.2s ease";
      });
    }, k = () => l ? "a-sub-item-dark" : "a-sub-item-light";
    return () => s("div", {
      class: "a-sub-menu-content",
      ref: r
    }, [s("div", {
      ref: f,
      class: `a-sub-item ${k()}`,
      onClick: () => v()
    }, [s("div", {
      class: "item-icon"
    }, [t.icon && t.icon()]), s("div", {
      class: "item-title"
    }, [t.title && t.title()]), s("div", {
      ref: d,
      class: `item-right-icon iconfont icon-right ${h.value ? "open" : "close"}`
    }, null)]), s("div", {
      ref: u,
      class: "a-sub-slot",
      slot: "sub"
    }, [t.default && t.default()])]);
  }
}), yl = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), bl = yl(gl);
const Ct = /* @__PURE__ */ S({
  name: "ATransition",
  setup(e, {
    slots: n
  }) {
    return () => s(pe, {
      name: "a-transition-fade"
    }, {
      default: () => [n.default && n.default()]
    });
  }
});
const wl = /* @__PURE__ */ S({
  name: "ADrawer",
  props: {
    modelValue: {
      type: Boolean,
      default: !0
    },
    size: {
      type: [Number, String],
      default: "30%"
    },
    title: {
      type: String,
      default: ""
    },
    direction: {
      type: String,
      default: "right"
    },
    closeOnClickModal: {
      type: Boolean,
      default: !1
    },
    beforeClose: {
      type: Function
    }
  },
  emits: ["update:modelValue", "opened", "closed"],
  setup(e, {
    emit: n,
    slots: t
  }) {
    const a = p(2e3), l = ["top", "bottom", "left", "right"], o = A(() => typeof e.size == "number" ? e.size + "px" : e.size), r = p(e.modelValue ? "0" : `-${o.value}`), u = A(() => l.find((y) => y === e.direction) || "right"), f = A(() => e.direction === "left" || e.direction === "right" ? "width" : "height");
    F(() => {
      setTimeout(() => {
        a.value = Oe();
      });
    }), I(() => e.modelValue, (y) => {
      const C = r.value;
      y ? (document.body.style.overflow = "hidden", setTimeout(() => {
        r.value = "0", n("opened");
      }, 50)) : (r.value = C, n("closed"), document.body.style.removeProperty("overflow"));
    });
    const d = () => {
      r.value = "-" + o.value, setTimeout(() => {
        n("update:modelValue", !e.modelValue);
      }, 180);
    }, c = () => {
      if (typeof e.beforeClose == "function") {
        e.beforeClose(d);
        return;
      } else
        d();
    }, h = () => {
      e.closeOnClickModal && c();
    }, i = () => t.header ? t.header() : s("span", null, [e.title]), v = () => s("div", {
      class: "a-drawer-header"
    }, [s("div", {
      class: "a-drawer-header-content"
    }, [s("div", {
      class: "header-slot"
    }, [i()]), s("span", {
      onClick: () => c(),
      class: "iconfont icon-close"
    }, null)])]), m = A(() => {
      const y = f.value === "height" ? "width" : "height";
      return {
        [f.value]: o.value,
        [u.value]: r.value,
        [`min-${y}`]: `100v${f.value === "height" ? "w" : "h"}`
      };
    });
    return () => s(Le, {
      to: "body"
    }, {
      default: () => [s(Ct, null, {
        default: () => [e.modelValue && s("div", {
          class: "a-drawer-mantle",
          style: {
            zIndex: a.value
          },
          onClick: () => h()
        }, [s("div", {
          onClick: (y) => y.stopPropagation(),
          class: "a-drawer-content",
          style: m.value
        }, [v(), s("div", {
          class: "a-drawer-body"
        }, [t.default && t.default()]), t.footer && s("div", {
          class: "a-drawer-footer"
        }, [t.footer()])])])]
      })]
    });
  }
}), kl = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), Sl = kl(wl);
const $l = S({
  name: "ACheckbox",
  props: {
    modelValue: {
      type: [Array, Boolean],
      default: []
    },
    defaultValue: {
      type: [Array, Boolean]
    },
    value: {
      type: [String, Number]
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    stopLabelTrigger: {
      type: Boolean,
      default: !1
    },
    indeterminate: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    "update:modelValue",
    "updateCheckedGroup",
    "tree-checked",
    "updateDefaultValue",
    "label-click"
  ],
  setup(e, { emit: n }) {
    const t = De(), a = p(""), l = p(!1);
    return ve(() => {
      if (t.slots.default && (a.value = t.slots.default()[0].children), e.defaultValue) {
        l.value = e.defaultValue;
        return;
      }
      Array.isArray(e.modelValue) ? l.value = e.modelValue.indexOf(e.value) !== -1 : l.value = e.modelValue;
    }), I(
      () => e.defaultValue,
      (u) => {
        l.value = u;
      }
    ), {
      valueSlot: a,
      checked: l,
      changeChecked: (u) => {
        if (l.value = !l.value, n("tree-checked"), n("updateDefaultValue", l.value), typeof e.modelValue == "boolean")
          n("update:modelValue", l.value);
        else {
          let f = [];
          l.value ? f = [.../* @__PURE__ */ new Set([...e.modelValue, e.value])] : (f = e.modelValue, e.modelValue.includes(e.value) && (f = f.filter(
            (d) => d !== e.value
          ))), n("updateCheckedGroup", f);
        }
      },
      handleLabelClick: (u) => {
        e.stopLabelTrigger && (n("label-click", u.target), u.preventDefault());
      }
    };
  }
}), Cl = { class: "a-checked-main" }, Vl = ["indeterminate", "id", "checked", "disabled"], Il = ["for"];
function xl(e, n, t, a, l, o) {
  return V(), R("div", Cl, [
    x("input", {
      indeterminate: e.indeterminate,
      onChange: n[0] || (n[0] = (...r) => e.changeChecked && e.changeChecked(...r)),
      class: Z(e.disabled && e.checked ? "checked" : ""),
      id: e.valueSlot,
      type: "checkbox",
      checked: e.checked,
      disabled: e.disabled
    }, null, 42, Vl),
    x("label", { for: e.valueSlot }, [
      x("span", {
        onClick: n[1] || (n[1] = (...r) => e.handleLabelClick && e.handleLabelClick(...r)),
        style: { "margin-left": "3px" }
      }, ee(e.valueSlot), 1)
    ], 8, Il)
  ]);
}
const Al = /* @__PURE__ */ W($l, [["render", xl]]), _l = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), je = _l(Al);
const Dl = S({
  name: "ACheckboxGroup",
  components: {
    ACheckbox: je
  },
  props: {
    modelValue: {
      type: Array,
      default: []
    },
    options: {
      type: Array,
      default: []
    }
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: n }) {
    return {
      ChangeValue: (l) => {
        let o = [...e.modelValue];
        o.indexOf(l.value) === -1 ? o.push(l.value) : o = o.filter((r) => r !== l.value), n("update:modelValue", o), n("change", l);
      },
      updateCheckedGroup: (l) => {
        n("update:modelValue", l);
      }
    };
  }
}), El = { class: "a-checkbox-group" };
function Bl(e, n, t, a, l, o) {
  const r = q("ACheckbox");
  return V(), R("div", El, [
    (V(!0), R(se, null, Ae(e.options, (u, f) => (V(), J(r, {
      key: f,
      value: u.value,
      disabled: u.disabled,
      modelValue: e.modelValue,
      "onUpdate:modelValue": n[0] || (n[0] = (d) => e.modelValue = d),
      onUpdateCheckedGroup: e.updateCheckedGroup
    }, {
      default: U(() => [
        ae(ee(u.label), 1)
      ]),
      _: 2
    }, 1032, ["value", "disabled", "modelValue", "onUpdateCheckedGroup"]))), 128))
  ]);
}
const Ml = /* @__PURE__ */ W(Dl, [["render", Bl]]), Tl = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), Rl = Tl(Ml);
const Ll = S({
  name: "ASwitch",
  props: {
    modelValue: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    size: {
      type: String,
      default: "default"
    },
    openTitle: {
      type: String,
      default: ""
    },
    offTitle: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: n }) {
    return {
      test: "是",
      uuid: Date.now() + Math.random() + "",
      switchChange: (r) => {
        const u = r.target;
        n("update:modelValue", u.checked);
      },
      getSwitchSize: (r) => {
        switch (r) {
          case "small":
            return "size-small";
          case "default":
            return "size-default";
          case "large":
            return "size-large";
          default:
            return "size-default";
        }
      }
    };
  }
}), Pl = { class: "switch-content" }, Ol = ["id", "checked", "disabled"], Nl = ["openTitle", "offTitle", "for"];
function Fl(e, n, t, a, l, o) {
  return V(), R("div", Pl, [
    x("input", {
      type: "checkbox",
      onClick: n[0] || (n[0] = (...r) => e.switchChange && e.switchChange(...r)),
      id: e.uuid,
      checked: e.modelValue,
      disabled: e.disabled,
      hidden: ""
    }, null, 8, Ol),
    x("label", {
      style: oe(`cursor: ${e.disabled ? "not-allowed" : "pointer"};opacity:${e.disabled && e.modelValue ? "0.5" : "1"}`),
      openTitle: e.openTitle,
      offTitle: e.offTitle,
      for: e.uuid
    }, null, 12, Nl)
  ]);
}
const Hl = /* @__PURE__ */ W(Ll, [["render", Fl]]), zl = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), Wl = zl(Hl);
const Yl = S({
  name: "ATag",
  props: {
    type: {
      type: String,
      default: "default"
    },
    closeable: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["closeEvent"],
  setup(e, { emit: n }) {
    const t = p(!1);
    return {
      mouseEnter: p(!1),
      closeTag: () => {
        n("closeEvent"), t.value = !0;
      },
      getTagType: (r) => {
        switch (r) {
          case "success":
            return "tag-success";
          case "info":
            return "tag-info";
          case "danger":
            return "tag-danger";
          case "warning":
            return "tag-warning";
          default:
            return "tag-default";
        }
      },
      Closeable: t
    };
  }
});
function Kl(e, n, t, a, l, o) {
  return e.Closeable ? he("", !0) : (V(), R("div", {
    key: 0,
    style: oe(`padding-right:${e.closeable ? "20px" : "9px"};`),
    class: Z(`tag ${e.getTagType(e.type)}`)
  }, [
    Pe(e.$slots, "default"),
    e.closeable ? (V(), R("div", {
      key: 0,
      class: Z(`close-content ${e.mouseEnter && `close-${e.type}`}`),
      onMouseleave: n[1] || (n[1] = (r) => e.mouseEnter = !1),
      onMouseenter: n[2] || (n[2] = (r) => e.mouseEnter = !0)
    }, [
      e.closeable ? (V(), R("span", {
        key: 0,
        class: "iconfont icon-close",
        onClick: n[0] || (n[0] = ht((...r) => e.closeTag && e.closeTag(...r), ["stop"]))
      })) : he("", !0)
    ], 34)) : he("", !0)
  ], 6));
}
const jl = /* @__PURE__ */ W(Yl, [["render", Kl]]), Ul = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), Gl = Ul(jl);
const ql = /* @__PURE__ */ S({
  name: "ALoading",
  props: {
    modelValue: {
      type: Boolean,
      default: !1
    },
    title: {
      type: String,
      default: ""
    },
    global: {
      type: Boolean,
      default: !0
    }
  },
  emits: [],
  setup(e, {
    emit: n,
    slots: t
  }) {
    const a = new Array(6).fill(NaN), l = A(() => e.global && (!t.default || typeof t.default != "function")), o = A(() => !l.value && e.modelValue), r = p(null), u = p(!1);
    I(() => e.modelValue, (h) => {
      f(h);
    });
    const f = (h) => {
      h ? (r.value.style.opacity = "1", l.value && (document.body.style.overflow = "hidden")) : (l.value && (r.value.style.opacity = "0"), document.body.style.removeProperty("overflow")), setTimeout(() => {
        u.value = h;
      }, h ? 0 : 500);
    }, d = A(() => ({
      position: l.value ? "relative" : "absolute",
      left: l.value ? "0" : "40%",
      zIndex: l.value ? 9999 : 101
    })), c = () => z(s("div", {
      class: "a-loading-content",
      style: d.value
    }, [s("div", {
      class: "a-chase"
    }, [a.map(() => s("div", {
      class: "a-chase-dot"
    }, null))]), s("div", {
      class: "a-title"
    }, [e.title])]), [[Y, e.modelValue]]);
    return () => s(Ct, null, {
      default: () => [z(s("div", {
        ref: r,
        class: `a-loading ${l.value && "a-global"}`,
        style: {
          position: l.value ? "fixed" : "relative"
        }
      }, [c(), s("div", {
        class: "a-loading-slot"
      }, [t.default && t.default()]), o.value && s("div", {
        class: "a-loading-mask"
      }, null)]), [[Y, l.value ? !!e.modelValue : !!(t.default && typeof t.default == "function")]])]
    });
  }
}), Xl = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), Ql = Xl(ql);
const Vt = /* @__PURE__ */ S({
  name: "AInputNumber",
  props: {
    modelValue: [Number, String],
    min: {
      type: Number,
      default: -1 / 0
    },
    max: {
      type: Number,
      default: 1 / 0
    },
    step: {
      type: Number,
      default: 1
    },
    readonly: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    placeholder: {
      type: String,
      default: ""
    },
    width: {
      type: Number,
      default: 150
    }
  },
  emits: ["update:modelValue"],
  setup(e, {
    emit: n
  }) {
    const t = j({
      numberValue: e.modelValue
    });
    I(() => e.modelValue, (u) => {
      t.numberValue = u;
    });
    const a = A(() => ({
      pointerEvents: "none",
      cursor: "not-allowed",
      color: "#e4e5e6"
    })), l = () => s(se, null, [s("div", {
      style: e.disabled ? a.value : "",
      onClick: () => o("add"),
      class: "add-button"
    }, [s("span", {
      class: "iconfont icon-jia"
    }, null)]), s("div", {
      style: e.disabled ? a.value : "",
      onClick: () => o("subtract"),
      class: "subtract-button"
    }, [s("span", {
      class: "iconfont icon-jian"
    }, null)])]);
    I(() => t.numberValue, (u) => {
      Number(u) >= e.max && e.max !== 1 / 0 ? t.numberValue = e.max : Number(u) <= e.min && e.min !== -1 / 0 && (t.numberValue = e.min), n("update:modelValue", t.numberValue);
    });
    const o = (u) => {
      if (!e.readonly)
        if (u === "add") {
          if (!t.numberValue) {
            t.numberValue = e.step;
            return;
          }
          t.numberValue += e.step;
        } else {
          if (!t.numberValue) {
            t.numberValue = -e.step;
            return;
          }
          t.numberValue -= e.step;
        }
    }, r = () => {
      Number(t.numberValue) >= e.max ? (t.numberValue = "", setTimeout(() => {
        t.numberValue = e.max;
      })) : Number(t.numberValue) <= e.min && (t.numberValue = "", setTimeout(() => {
        t.numberValue = e.min;
      }));
    };
    return () => s("div", {
      class: "a-input-number-content"
    }, [l(), s(Ee, {
      onBlur: () => r(),
      placeholder: e.placeholder,
      readonly: e.readonly,
      disabled: e.disabled,
      textCenter: !0,
      width: e.width,
      modelValue: t.numberValue,
      "onUpdate:modelValue": (u) => t.numberValue = u,
      type: "number"
    }, null)]);
  }
}), Jl = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), Zl = Jl(Vt);
const ea = { open: "caret-down", close: "caret-right" }, ta = S({
  name: "ATreeItem",
  props: {
    data: {
      type: Array,
      default: () => []
    },
    isSelect: {
      type: Boolean,
      default: !1
    },
    expand: {
      type: Boolean,
      default: !1
    },
    props: {
      type: Object,
      default: () => ({
        children: "children",
        label: "title",
        key: "id"
      })
    }
  },
  emits: ["checkedItem"],
  components: {
    ACheckBox: je
  },
  setup(e, { emit: n }) {
    const t = D("uniKey"), a = we(), l = D("node-key"), o = j(e.data), r = D("tree-data"), u = j({
      carets: ea,
      tapScopes: {},
      scopes: {},
      height: 0
    });
    ve(() => {
    }), F(() => {
    });
    const f = (m, y, C) => {
      d(m, y), T.$emit("checked" + t, m, C);
    }, d = (m, y) => {
      m.checked = y, m.checked ? m.children && m.children.length > 0 && m.children.forEach((C) => {
        d(C, !0);
      }) : m.children && m.children.length > 0 && m.children.forEach((C) => {
        d(C, !1);
      }), c(r, m, m.checked);
    }, c = (m, y, C) => {
      m.forEach((k) => {
        if (k.key === y.pid) {
          let g = !1;
          k.children && (g = k.children.some(
            (w) => w.checked === !1
          )), g ? (k.checked = !1, k.children.some(
            (w) => w.checked === !0 || w.indeterminate === !0
          ) ? k.indeterminate = !0 : k.indeterminate = !1) : (k.checked = C, k.indeterminate = !1), c(r, k, k.checked);
        }
        k.children && c(k.children, y, C);
      });
    };
    return {
      treeData: o,
      uniKey: t,
      nodeKey: l,
      state: u,
      operation: (m, y) => {
        T.$emit("operation" + t, { type: m, treeNode: y });
      },
      tap: (m, y) => {
        T.$emit("node-click" + t, m);
      },
      changeStatus: (m, y) => {
        const C = m.target;
        ["LABEL", "INPUT"].includes(C.nodeName) || (T.$emit("change" + t, e.data[y]), u.tapScopes[y] = u.tapScopes[y] && u.tapScopes[y] === "open" ? "close" : "open", u.scopes[y] = !u.scopes[y]);
      },
      uid: a,
      updateDefaultValue: d,
      checkedTreeItem: f
    };
  }
}), na = { class: "a-tree-menu" }, la = ["node-key"], aa = ["onClick"], oa = ["onClick"], sa = ["onClick"];
function ra(e, n, t, a, l, o) {
  const r = q("ACheckBox"), u = q("a-tree-item");
  return V(), R("div", na, [
    (V(!0), R(se, null, Ae(e.treeData, (f, d) => (V(), R("div", {
      class: Z(`a-tree-list tree-ref-${e.uid}`),
      ref_for: !0,
      ref: "treeRef",
      "node-key": f[e.nodeKey],
      key: f[e.props.key]
    }, [
      x("div", {
        class: Z(["a-tree-item", ["treeNode", { "treeNode--select": f.onSelect }]]),
        onClick: (c) => e.changeStatus(c, d)
      }, [
        z(x("i", {
          class: Z([
            "iconfont icon-tree-retract",
            e.state.carets[e.state.tapScopes[d]]
          ])
        }, null, 2), [
          [Y, f[e.props.children]]
        ]),
        e.isSelect ? (V(), J(r, {
          key: 0,
          stopLabelTrigger: !0,
          style: { "margin-left": "5px" },
          "default-value": f.checked,
          indeterminate: f.indeterminate,
          onUpdateDefaultValue: (c) => {
            e.checkedTreeItem(f, c, d);
          },
          onLabelClick: (c) => e.tap(f, d)
        }, {
          default: U(() => [
            x("span", {
              onClick: (c) => e.tap(f, d),
              class: "title"
            }, ee(f[e.props.label]), 9, oa)
          ]),
          _: 2
        }, 1032, ["default-value", "indeterminate", "onUpdateDefaultValue", "onLabelClick"])) : (V(), R("span", {
          key: 1,
          onClick: (c) => e.tap(f, d)
        }, ee(f[e.props.label]), 9, sa))
      ], 10, aa),
      x("div", {
        class: "a-tree-item-content",
        style: oe({ gridTemplateRows: e.state.scopes[d] ? "1fr" : "0fr" })
      }, [
        s(u, {
          isSelect: e.isSelect,
          data: f[e.props.children]
        }, null, 8, ["isSelect", "data"])
      ], 4)
    ], 10, la))), 128))
  ]);
}
const ia = /* @__PURE__ */ W(ta, [["render", ra]]);
const ua = S({
  name: "ATree",
  props: {
    data: {
      type: Array,
      default: () => []
    },
    isSelect: {
      type: Boolean,
      default: !1
    },
    expand: {
      type: Boolean,
      default: !1
    },
    props: {
      type: Object,
      default: () => ({
        children: "children",
        label: "title",
        key: "id"
      })
    },
    nodeKey: {
      type: String,
      default: ""
    },
    defaultCheckedKeys: {
      type: Array,
      default: () => []
    }
  },
  components: {
    TreeItem: ia
  },
  emits: [
    "update:defaultCheckedKeys",
    "operation",
    "node-click",
    "change",
    "checked"
  ],
  setup(e, { emit: n }) {
    const t = we(), a = j(He(e.data)), l = e.data[0].key, o = (d, c, h) => {
      d.forEach((i) => {
        if (i.key === c.pid) {
          let v = !1;
          i.children && (v = i.children.some((m) => m.checked === !1)), v ? (i.checked = !1, i.children.some((m) => m.checked === !0 || m.indeterminate === !0) ? i.indeterminate = !0 : i.indeterminate = !1) : (i.checked = h, i.indeterminate = !1), o(a, i, i.checked);
        }
        i.children && o(i.children, c, h);
      });
    }, r = (d, c = !1, h = null) => {
      for (let i = 0; i < d.length; i++) {
        let v = c;
        const m = d[i];
        m.checked = !1, m.pid = h, m.expand = e.expand, m.indeterminate = !1, v ? m.checked = !0 : e.defaultCheckedKeys.includes(m.key) ? (m.checked = !0, v = !0) : m.children && m.children.some((C) => e.defaultCheckedKeys.includes(C.key)) && (m.checked = !1), m.children && r(m.children, v, m.key), o(a, m, m.checked);
      }
    };
    r(a), ve(() => {
      u();
    }), xe(() => {
      T.$off("operation"), T.$off("node-click"), T.$off("change"), T.$off("checked");
    });
    const u = () => {
      T.$on("operation" + t, ({ type: d, treeNode: c }) => {
        n("operation", { type: d, treeNode: c });
      }), T.$on("node-click" + t, (d) => {
        n("node-click", d);
      }), T.$on("change" + t, (d) => {
        n("change", d);
      }), T.$on("checked" + t, (d) => {
        n("checked", d);
      });
    }, f = (d) => {
      if (d[0].key !== l)
        return;
      let c = e.defaultCheckedKeys;
      r(d), n("update:defaultCheckedKeys", c);
    };
    return M("uniKey", t), M("default-checked-keys", e.defaultCheckedKeys), M("node-key", e.nodeKey), M("tree-data", a), M("expand", e.expand), {
      treeData: a,
      checkedItem: f
    };
  }
});
function ca(e, n, t, a, l, o) {
  const r = q("TreeItem");
  return V(), J(r, {
    data: e.treeData,
    isSelect: e.isSelect,
    props: e.props,
    expand: e.expand,
    onCheckedItem: e.checkedItem
  }, null, 8, ["data", "isSelect", "props", "expand", "onCheckedItem"]);
}
const da = /* @__PURE__ */ W(ua, [["render", ca]]), fa = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), ha = fa(da);
const ma = S({
  props: {
    modelValue: {
      type: Number
    },
    value: {
      type: [Number, String]
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["updateRadioValue"],
  setup(e, { emit: n }) {
    const t = D("modelValue"), a = De(), l = p(""), o = p(!1);
    return ve(() => {
      o.value = t === e.value, l.value = a.slots.default()[0].children;
    }), I(
      () => e.modelValue,
      () => {
        o.value = e.modelValue === e.value;
      },
      { deep: !0 }
    ), {
      isChecked: o,
      valueSlot: l,
      changeChecked: () => {
        n("updateRadioValue", e.value);
      }
    };
  }
}), va = { class: "radio-main" }, pa = ["id", "checked", "value", "disabled"], ga = ["for"], ya = { style: { "margin-left": "3px" } };
function ba(e, n, t, a, l, o) {
  return V(), R("div", va, [
    x("input", {
      class: Z(e.disabled && e.isChecked ? "checked" : ""),
      type: "radio",
      onClick: n[0] || (n[0] = (...r) => e.changeChecked && e.changeChecked(...r)),
      id: e.valueSlot,
      name: "radio",
      checked: e.isChecked,
      value: e.value,
      disabled: e.disabled
    }, null, 10, pa),
    x("label", { for: e.valueSlot }, [
      x("span", ya, ee(e.valueSlot && e.valueSlot), 1)
    ], 8, ga)
  ]);
}
const wa = /* @__PURE__ */ W(ma, [["render", ba]]), ka = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), It = ka(wa);
const Sa = S({
  name: "ARadioGroup",
  props: {
    modelValue: {
      type: [Number, String]
    },
    options: {
      type: Array,
      default: []
    }
  },
  components: {
    ARadio: It
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: n }) {
    const t = (a) => {
      n("update:modelValue", a), n("change", a);
    };
    return M("modelValue", e.modelValue), {
      updateRadioValue: t
    };
  }
}), $a = { class: "a-radio-group" };
function Ca(e, n, t, a, l, o) {
  const r = q("ARadio");
  return V(), R("div", $a, [
    (V(!0), R(se, null, Ae(e.options, (u, f) => (V(), J(r, {
      key: f,
      value: u.value,
      disabled: u.disabled,
      onUpdateRadioValue: e.updateRadioValue
    }, {
      default: U(() => [
        ae(ee(u.label), 1)
      ]),
      _: 2
    }, 1032, ["value", "disabled", "onUpdateRadioValue"]))), 128))
  ]);
}
const Va = /* @__PURE__ */ W(Sa, [["render", Ca]]), Ia = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), xa = Ia(Va);
const Aa = /* @__PURE__ */ S({
  name: "ATable",
  emits: [],
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    maxHeight: {
      type: String,
      default: () => "100%"
    },
    bordered: {
      type: Boolean,
      default: !0
    },
    singleLine: {
      type: Boolean,
      default: !0
    }
  },
  setup(e, {
    emit: n
  }) {
    const t = p(null), a = j({
      data: e.data,
      columns: e.columns,
      gutterWidth: 15
    });
    I([() => e.columns, () => e.data], ([f, d]) => {
      a.columns = f, a.data = d;
    });
    const l = A(() => a.data.length === 0);
    F(() => {
    });
    const o = () => s("thead", {
      class: "a-table-thead"
    }, [s("tr", {
      class: "a-table-tr"
    }, [a.columns.map(({
      key: f,
      title: d,
      width: c
    }, h) => s("th", {
      class: ["a-table-th", e.singleLine ? "" : "single-line"],
      key: f,
      style: {
        width: c ? c + "px" : "auto"
      }
    }, [s("div", {
      class: "a-table-th_title-wrapper"
    }, [s("div", {
      class: "a-table-th__title"
    }, [d])])]))])]), r = () => {
      const f = ["a-table-td", e.singleLine ? "" : "single-line"], d = (c) => ({
        width: c ? c + "px" : "auto",
        "--a-table-tr-bottom": e.bordered ? "none" : "1px solid var(--a-border-weak-color)"
      });
      return s("tbody", {
        class: "a-table-tbody"
      }, [a.data.map((c) => s("tr", {
        class: "a-table-tr"
      }, [a.columns.map(({
        key: h,
        render: i,
        width: v
      }) => s("td", {
        "data-col-key": h,
        class: f,
        style: d(v)
      }, [i ? i(c) : c[h]]))]))]);
    }, u = () => s("div", {
      class: "a-table-empty_wrapper"
    }, [s(G, {
      name: "data-view",
      style: {
        fontSize: "50px",
        color: "var(--a-text-disable-color)"
      }
    }, null), s("div", {
      class: "text"
    }, [ae("无数据")])]);
    return () => s("div", {
      class: "a-table",
      style: {
        border: e.bordered ? "1px solid var(--a-border-weak-color)" : "none"
      }
    }, [s("table", {
      class: "table"
    }, [o()]), l.value ? u() : s(Re, {
      style: {
        maxHeight: e.maxHeight
      }
    }, {
      default: () => [s("div", {
        class: "a-table--body-wrapper",
        ref: t
      }, [s("table", {
        class: "table"
      }, [r()])])]
    })]);
  }
}), _a = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), Da = _a(Aa);
const Ea = S({
  name: "ADot",
  props: {
    dotLength: {
      type: Number
    },
    currentIndex: {
      type: Number
    },
    dotBgColor: {
      type: String,
      default: "#666"
    },
    hasDot: {
      type: Boolean
    },
    dotPositon: {
      type: String,
      default: "center"
    }
  },
  emits: ["dotClick"],
  setup(e, { emit: n }) {
    return {
      dotClick: (a) => {
        n("dotClick", a);
      }
    };
  }
}), Ba = ["onClick"], Ma = /* @__PURE__ */ x("a", {
  href: "javascript:;",
  class: "dot-link"
}, null, -1), Ta = [
  Ma
];
function Ra(e, n, t, a, l, o) {
  return e.hasDot ? (V(), R("div", {
    key: 0,
    class: Z(`dot-wrapper-${e.dotPositon}`)
  }, [
    (V(!0), R(se, null, Ae(e.dotLength, (r) => (V(), R("div", {
      class: "dot-item",
      key: r,
      onClick: (u) => e.dotClick(r - 1),
      style: oe({
        backgroundColor: r - 1 === e.currentIndex ? "#fff" : e.dotBgColor
      })
    }, Ta, 12, Ba))), 128))
  ], 2)) : he("", !0);
}
const La = /* @__PURE__ */ W(Ea, [["render", Ra]]);
const Pa = S({
  name: "ADirector",
  props: {
    showDirector: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["clickDirector"],
  setup(e, { emit: n }) {
    const t = p(null), a = (l) => {
      n("clickDirector", l);
    };
    return F(() => {
    }), {
      clickDirector: a,
      directorRef: t
    };
  }
}), Oa = {
  ref: "directorRef",
  class: "director"
}, Na = /* @__PURE__ */ x("span", { class: "iconfont icon-left" }, null, -1), Fa = [
  Na
], Ha = /* @__PURE__ */ x("span", { class: "iconfont icon-right" }, null, -1), za = [
  Ha
];
function Wa(e, n, t, a, l, o) {
  return V(), J(pe, { name: "fade" }, {
    default: U(() => [
      z(x("div", Oa, [
        x("div", {
          onClick: n[0] || (n[0] = (r) => e.clickDirector("pre")),
          class: "directorContent director-left"
        }, Fa),
        x("div", {
          onClick: n[1] || (n[1] = (r) => e.clickDirector("next")),
          class: "directorContent director-right"
        }, za)
      ], 512), [
        [Y, e.showDirector]
      ])
    ]),
    _: 1
  });
}
const Ya = /* @__PURE__ */ W(Pa, [["render", Wa]]);
const Ka = S({
  name: "ARotation",
  components: {
    Dot: La,
    Director: Ya
  },
  props: {
    dotBgColor: {
      type: String
    },
    autoplay: {
      type: Boolean,
      default: !0
    },
    duration: {
      type: Number,
      default: 3e3
    },
    initial: {
      type: Number,
      default: 1
    },
    hasDot: {
      type: Boolean,
      default: !0
    },
    hasDirector: {
      type: Boolean,
      default: !0
    },
    dotPositon: {
      type: String,
      default: "center"
    }
  },
  emits: [],
  setup(e, { emit: n }) {
    let t = null;
    const a = De(), l = p(null), o = j({
      currentIndex: e.initial - 1,
      picLength: 0,
      contentHeight: 0,
      contentWidth: 0,
      showDirector: !1
    });
    M("currentIndex", Mt(o, "currentIndex")), F(() => {
      ue(() => {
        r();
        const i = a.slots.default()[0].children;
        o.picLength = i.length, u();
      });
    }), xe(() => {
      clearInterval(t), t = null;
    });
    const r = () => {
      const i = l.value.children[0] || 250;
      o.contentHeight = Ce(i, "height"), o.contentWidth = Ce(i, "width");
    }, u = () => {
      clearInterval(t), e.autoplay && (t = setInterval(() => {
        f("next");
      }, e.duration));
    }, f = (i) => {
      switch (i) {
        case "next":
          o.currentIndex += 1, o.currentIndex === o.picLength && (o.currentIndex = 0);
          break;
        case "pre":
          o.currentIndex -= 1, o.currentIndex === -1 && (o.currentIndex = o.picLength - 1);
          break;
      }
    };
    return {
      showDirectorFn: (i) => {
        i ? clearInterval(t) : u(), o.showDirector = i;
      },
      slotContent: l,
      dotClick: (i) => {
        o.currentIndex = i, u();
      },
      clickDirector: (i) => {
        f(i), u();
      },
      ..._e(o)
    };
  }
}), ja = { class: "rotation" }, Ua = { ref: "slotContent" };
function Ga(e, n, t, a, l, o) {
  const r = q("Dot"), u = q("Director");
  return V(), R("div", ja, [
    x("div", {
      class: "inner",
      style: oe(`height:${e.contentHeight + "px"};width:${e.contentWidth + "px"}`),
      onMouseenter: n[0] || (n[0] = (f) => e.showDirectorFn(!0)),
      onMouseleave: n[1] || (n[1] = (f) => e.showDirectorFn(!1))
    }, [
      x("div", Ua, [
        Pe(e.$slots, "default")
      ], 512),
      s(r, {
        hasDot: e.hasDot,
        currentIndex: e.currentIndex,
        dotLength: e.picLength,
        dotBgColor: e.dotBgColor,
        dotPositon: e.dotPositon,
        onDotClick: e.dotClick
      }, null, 8, ["hasDot", "currentIndex", "dotLength", "dotBgColor", "dotPositon", "onDotClick"]),
      s(u, {
        showDirector: e.hasDirector && e.showDirector,
        onClickDirector: e.clickDirector
      }, null, 8, ["showDirector", "onClickDirector"])
    ], 36)
  ]);
}
const qa = /* @__PURE__ */ W(Ka, [["render", Ga]]), Xa = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), Qa = Xa(qa);
const Ja = S({
  name: "ARotationItem",
  setup() {
    const e = D("currentIndex", p(0)), n = De(), t = j({
      selfIndex: n == null ? void 0 : n.vnode.key,
      currentIndex: e
    });
    return I(e, (a) => {
      t.currentIndex = a;
    }), {
      ..._e(t)
    };
  }
}), Za = { class: "rotation-item" };
function eo(e, n, t, a, l, o) {
  return V(), J(pe, null, {
    default: U(() => [
      z(x("div", Za, [
        Pe(e.$slots, "default")
      ], 512), [
        [Y, e.selfIndex === e.currentIndex]
      ])
    ]),
    _: 3
  });
}
const to = /* @__PURE__ */ W(Ja, [["render", eo]]), no = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), lo = no(to);
const ao = /* @__PURE__ */ S({
  name: "APagination",
  props: {
    total: {
      type: [Number, String],
      default: 0
    },
    // 总数 The total number of
    currentPage: {
      type: [Number, String],
      default: 1
    },
    // 当前页数 The current number of pages
    pageSize: {
      type: [Number, String],
      default: () => 10
    },
    // 每页显示条数 Size of entries per page
    sizesList: {
      type: Array,
      default: () => [10, 20, 50, 100]
    },
    // 每页显示条数的选项设置 Option setting to display number of entries per page
    background: {
      type: Boolean,
      default: !1
    },
    showSizeChanger: {
      type: Boolean,
      default: !1
    },
    showQuickJumper: {
      type: Boolean,
      default: !1
    },
    showTotal: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["page-change", "size-change"],
  setup(e, {
    emit: n,
    slots: t
  }) {
    const a = p(e.currentPage), l = p([]), o = p(e.pageSize), r = A(() => Math.ceil(Number(e.total) / Number(o.value))), u = p(2), f = A(() => {
      let g = [];
      return e.sizesList.forEach((w) => {
        g.push({
          value: w,
          text: w + " 条/页"
        });
      }), g;
    }), d = (g, w, b) => {
      let $ = [], _ = b * 2 + 1 + 2 + 2 + 2, L = _ - 4, H = 1 + 2 + b + 1, K = g - 2 - b - 1;
      const E = {
        omit: !0,
        value: "...",
        type: "prev"
      }, B = {
        omit: !0,
        value: "...",
        type: "next"
      };
      return g <= _ - 2 ? $ = Array.from({
        length: g
      }, (N, P) => P + 1) : w < H ? $ = [...Array.from({
        length: L
      }, (N, P) => P + 1), B, g] : w > K ? $ = [1, E, ...Array.from({
        length: L
      }, (N, P) => g - L + P + 1)] : $ = [1, E, ...Array.from({
        length: b * 2 + 1
      }, (N, P) => w - b + P), B, g], $;
    }, c = () => {
      l.value = d(r.value, Number(a.value), u.value);
      const g = l.value[l.value.length - 1];
      Number(a.value) < 1 ? a.value = 1 : Number(a.value) > g && (a.value = g);
    };
    c(), I(() => e.currentPage, (g) => {
      a.value = g, c();
    }), I(() => a.value, () => {
      c();
    }), I(() => e.pageSize, (g) => o.value = g), I(() => o.value, (g) => n("size-change", g)), I(() => r.value, () => c());
    const h = A(() => (g) => {
      let w = "btn pagination-item";
      return e.background && (w += " background"), Number(a.value) === g && (w += ` ${e.background ? "background-current" : "current"}`), w;
    }), i = (g) => {
      if (typeof g == "number")
        g !== a.value && (a.value = g, n("page-change", g));
      else if (typeof g == "object") {
        const w = u.value * 2 + 1;
        g.type === "prev" ? n("page-change", Number(a.value) - w) : n("page-change", Number(a.value) + w);
      }
    }, v = (g) => {
      let w = a.value;
      if (g === "prev") {
        if (w === 1)
          return;
        n("page-change", Number(w) - 1);
      } else {
        if (w === l.value[l.value.length - 1])
          return;
        n("page-change", Number(w) + 1);
      }
    }, m = A(() => (g) => {
      let w = "";
      return g === "prev" ? a.value === 1 && (w = "disable") : a.value === l.value[l.value.length - 1] && (w = "disable"), w;
    }), y = (g) => typeof g == "number" ? g : s("span", {
      class: "iconfont icon-shenglvehao"
    }, null), C = (g, w, b) => {
      const $ = b;
      if ($.omit) {
        const _ = g.target.firstChild;
        w === "enter" ? $.type === "prev" ? _.className = "iconfont icon-doubleleft" : _.className = "iconfont icon-doubleright-copy" : _.className = "iconfont icon-shenglvehao";
      }
    }, k = async (g) => {
      let w = a.value;
      if (g === "" || Number.isNaN(Number(g))) {
        let $ = a.value;
        a.value = "", await ue(), a.value = $;
        return;
      }
      const b = l.value[l.value.length - 1];
      Number(g) < 1 ? w = 1 : Number(g) > b ? w = b : w = g, Number(g) > b && (a.value = "", await ue(), a.value = w), n("page-change", Number(w));
    };
    return () => s("div", {
      class: "a-pagination-content"
    }, [e.showTotal && s("div", {
      class: "a-pagination-total"
    }, [ae("Total "), e.total]), s("div", {
      class: `btn ${e.background ? "background" : ""} prev ${m.value("prev")}`,
      onClick: () => v("prev")
    }, [s("span", {
      class: "iconfont icon-left"
    }, null)]), s("div", {
      class: "pagination-list"
    }, [l.value.map((g, w) => s("div", {
      onMouseleave: (b) => C(b, "leave", g),
      onMouseenter: (b) => C(b, "enter", g),
      onClick: () => i(g),
      key: w,
      class: h.value(g)
    }, [y(g)]))]), s("div", {
      class: `btn ${e.background ? "background" : ""} next ${m.value("next")}`,
      onClick: () => v("next")
    }, [s("span", {
      class: "iconfont icon-right"
    }, null)]), z(s("div", {
      class: "page-size-select"
    }, [s($t, {
      width: "80",
      modelValue: o.value,
      "onUpdate:modelValue": (g) => o.value = g,
      options: f.value
    }, null)]), [[Y, e.showSizeChanger || Number(e.total) > 50]]), z(s("div", {
      class: "a-pagination-goto"
    }, [s("span", null, [ae("跳至")]), s(Ee, {
      width: "35",
      placeholder: "",
      value: a.value,
      textCenter: !0,
      onEnter: (g) => k(g)
    }, null)]), [[Y, e.showQuickJumper]])]);
  }
}), oo = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), so = oo(ao);
const ro = S({
  setup() {
    const e = p(!1), n = p(), t = p("#303133"), a = p("bottom");
    function l() {
      e.value = !0;
    }
    function o() {
      e.value = !1;
    }
    const r = p({
      left: 0,
      top: 0
    }), u = A(() => ({
      left: r.value.left + "px",
      top: r.value.top + "px"
    }));
    return {
      tooltipShow: e,
      showTip: l,
      hiddenTip: o,
      tooltipPostiton: r,
      tooltipStyle: u,
      text: n,
      placements: a,
      bgColor: t
    };
  }
}), io = ["innerHTML"];
function uo(e, n, t, a, l, o) {
  return V(), J(pe, { name: "tooltip" }, {
    default: U(() => [
      z(x("div", {
        class: "a-tooltip",
        style: oe([e.tooltipStyle, { backgroundColor: e.bgColor }])
      }, [
        x("span", {
          class: "a-tooltip-text",
          innerHTML: e.text
        }, null, 8, io),
        x("div", {
          class: Z(["a-tooltip-arrow", [
            { left: e.placements == "left" },
            { bottom: e.placements == "bottom" },
            { right: e.placements == "right" },
            { top: e.placements == "top" }
          ]]),
          style: oe({
            "--tooltip-bgColor": e.bgColor
          })
        }, null, 6)
      ], 4), [
        [Y, e.tooltipShow]
      ])
    ]),
    _: 1
  });
}
const co = /* @__PURE__ */ W(ro, [["render", uo]]);
function fo(e) {
  e._tipHandler && e.removeEventListener("mouseenter", e._tipHandler), e._tipMouseleaveHandler && e.removeEventListener("mouseleave", e._tipMouseleaveHandler), delete e._tipHandler, delete e._tipMouseleaveHandler, delete e._tipOptions, delete e._tipInstance;
}
function ot(e, n, t) {
  let a = t;
  if (!e || !n)
    return;
  e.tooltipPostiton.left = 0, e.tooltipPostiton.top = 0;
  let l, o, r, u = e.$el.nodeType === 3 ? e.$el.nextElementSibling : e.$el;
  l = u.getBoundingClientRect(), o = n.getBoundingClientRect(), r = u.querySelector(".a-tooltip-arrow ");
  let f, d;
  switch (a) {
    case "top":
      o.top < l.height && (a = "bottom");
      break;
    case "bottom":
      o.bottom < l.height && (a = "top");
      break;
    case "left":
      o.left < l.width && (a = "right");
      break;
    case "right":
      o.right < l.width && (a = "left");
      break;
    default:
      throw new Error("Invalid direction");
  }
  switch (r.className = `a-tooltip-arrow ${a}`, a) {
    case "top":
      f = o.top - u.offsetHeight - 10, d = o.left + (o.width - u.offsetWidth) / 2;
      break;
    case "bottom":
      f = o.bottom + 10, d = o.left + (o.width - u.offsetWidth) / 2;
      break;
    case "left":
      f = o.top + (o.height - u.offsetHeight) / 2, d = o.left - u.offsetWidth - 10;
      break;
    case "right":
      f = o.top + (o.height - u.offsetHeight) / 2, d = o.right + 10;
      break;
    default:
      throw new Error("Invalid direction");
  }
  e.tooltipPostiton.top = f, e.tooltipPostiton.left = d;
}
const st = ["bottom", "left", "right", "top"], $e = {
  install(e) {
    e.directive("tooltip", {
      mounted: $e.mounted,
      updated: $e.updated,
      unmounted: $e.unmounted
    });
  },
  mounted(e, n) {
    fo(e);
    let t = null;
    e._tipOptions = n.value, e._tipHandler = () => {
      t !== null && (clearTimeout(t), t = null);
      const a = st.filter((o) => n.modifiers[o]), l = a.length ? a : st;
      e._tipInstance || (e._synopsis = We(co), e._root = document.createElement("div"), document.body.appendChild(e._root), e._tipInstance = e._synopsis.mount(e._root)), e._tipInstance.placements = l[0], e._tipInstance.showTip(), typeof e._tipOptions == "object" ? (e._tipInstance.text = e._tipOptions.text, e._tipInstance.bgColor = e._tipOptions.bgColor || "#303133") : e._tipInstance.text = e._tipOptions, ue(() => {
        ot(e._tipInstance, e, l[0]);
      }), e._scrollHandler = () => {
        e._tipInstance.tooltipShow && ot(e._tipInstance, e, l[0]);
      }, window.addEventListener("scroll", e._scrollHandler);
    }, e._tipMouseleaveHandler = () => {
      e._tipInstance && (t = setTimeout(() => {
        e._tipInstance.hiddenTip();
      }, 300));
    }, document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", e._tipHandler), e._tipMouseleaveHandler();
    }), e.addEventListener("mousedown", () => {
      document.addEventListener("mousemove", e._tipHandler);
    }), e.addEventListener("mouseenter", e._tipHandler), e.addEventListener("mouseleave", () => {
      e._tipMouseleaveHandler();
    });
  },
  updated(e, n) {
    e._tipOptions = n.value;
  },
  unmounted(e) {
    e._tipInstance && (e._synopsis.unmount(), document.body.removeChild(e._root)), window.removeEventListener("scroll", e._scrollHandler);
  }
};
const ho = /* @__PURE__ */ S({
  name: "ABreadcrumb",
  props: {
    flag: {
      type: String,
      default: "/"
    },
    isRouter: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["pathClick"],
  setup(e, {
    emit: n,
    slots: t
  }) {
    return M("flag", e.flag), M("isRouter", e.isRouter), M("pathClick", (l) => {
      n("pathClick", l);
    }), () => s("div", {
      class: "a-breadcrumb-content"
    }, [t.default && t.default()]);
  }
}), mo = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), vo = mo(ho);
const po = /* @__PURE__ */ S({
  name: "ABreadcrumbItem",
  props: {
    path: {
      type: String,
      default: ""
    }
  },
  emits: ["pathClick"],
  setup(e, {
    emit: n,
    slots: t
  }) {
    const a = D("flag", "/");
    D("isRouter", !1);
    const l = D("pathClick", () => {
    }), o = () => t.default ? t.default() : "", r = () => {
      l(e.path);
    };
    return () => s("div", {
      class: "a-breadcrumb-item"
    }, [s("span", {
      class: "title-href",
      onClick: () => r()
    }, [o()]), s("span", {
      class: "flag"
    }, [a])]);
  }
}), go = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), yo = go(po);
const bo = /* @__PURE__ */ S({
  name: "ASlider",
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 1
    },
    showStops: {
      type: Boolean,
      default: !1
    },
    showInput: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:modelValue", "change"],
  directives: {
    ATolltip: $e
  },
  setup(e, {
    slots: n,
    emit: t
  }) {
    const a = p(), l = p(), o = p(), r = p(), u = p(0), f = p(!1), d = p(0), c = p(0), h = A(() => Math.round(c.value / d.value * 100)), i = A(() => d.value * (e.step / 100)), v = p(h.value);
    I(h, (b) => {
      b !== e.modelValue && (t("update:modelValue", b), t("change", b));
    }), I(() => e.modelValue, () => {
      m();
    }), I(() => v.value, (b) => {
      b !== e.modelValue && (t("update:modelValue", b), t("change", b), m());
    }), F(() => {
      ue(() => {
        m();
      });
    });
    const m = () => {
      d.value = a.value.offsetWidth, c.value = e.modelValue / 100 * d.value, o.value.style.left = c.value + "px", l.value.style.width = c.value + "px", v.value = h.value;
    }, y = (b) => {
      b.stopPropagation(), b.preventDefault(), u.value = b.clientX, document.addEventListener("mousemove", k), document.addEventListener("mouseup", w);
    }, C = (b) => {
      u.value = b.clientX;
      const $ = a.value.getBoundingClientRect().left, _ = g(b.clientX - $, i.value);
      c.value = _, o.value.style.left = c.value + "px", l.value.style.width = c.value + "px";
    }, k = (b) => {
      b.preventDefault(), f.value = !0;
      let $ = b.clientX < u.value ? "left" : "right";
      const _ = a.value.getBoundingClientRect(), L = _.left, H = _.width, K = b.clientX >= L && b.clientX - L <= H;
      if (f.value && (K || $ === "left" && h.value > 0 || $ === "right" && h.value < 100)) {
        const B = b.clientX - u.value, N = o.value.offsetLeft, P = N + B;
        if (Math.abs(P - N) >= H * (e.step / 100)) {
          const te = Math.min(Math.max(P, 0), H);
          c.value = g(te, i.value), o.value.style.left = c.value + "px", l.value.style.width = c.value + "px", u.value = b.clientX;
        }
      }
    }, g = (b, $) => {
      const _ = b % $;
      if (_ === 0)
        return b;
      {
        const L = b - _, H = L + $;
        return b - L <= H - b ? L : H;
      }
    }, w = () => {
      f.value = !1, document.removeEventListener("mousemove", k), document.removeEventListener("mouseup", w);
    };
    return () => s("div", {
      class: "a-slider-content"
    }, [s("div", {
      class: "a-slider-runway",
      style: {
        marginRight: e.showInput ? "30px" : ""
      },
      ref: a,
      onMousedown: (b) => C(b)
    }, [s("div", {
      class: "a-slider-stop-list"
    }, [e.showStops && Array.from({
      length: g(d.value / i.value, 1)
    }).map((b, $) => s("div", {
      class: "stop-item",
      style: {
        left: i.value * $ + 1 + "px"
      }
    }, null))]), s("div", {
      class: "a-slider-bar",
      ref: l
    }, null), z(s("div", {
      class: "a-slider-button_wrapper",
      ref: o,
      onMousedown: (b) => y(b)
    }, [s("div", {
      ref: r,
      class: "a-slider-button"
    }, null)]), [[Tt("tooltip"), h.value, void 0, {
      top: !0
    }]])]), e.showInput && s(Vt, {
      modelValue: v.value,
      "onUpdate:modelValue": (b) => v.value = b,
      width: 100,
      max: 100,
      min: 0,
      step: e.step
    }, null)]);
  }
}), wo = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), ko = wo(bo);
const So = /* @__PURE__ */ S({
  name: "AProgress",
  props: {
    percentage: {
      type: Number,
      default: 0,
      required: !0
    },
    format: Function,
    status: {
      type: String
    },
    color: {
      type: [String, Array],
      default: "var(--a-primary-color)"
    },
    textInside: {
      type: Boolean,
      default: !1
    },
    strokeWidth: {
      type: Number,
      default: 6
    }
  },
  emits: [],
  setup(e, {
    emit: n
  }) {
    const t = p(null), a = A(() => e.percentage <= 0 ? 0 : e.percentage >= 100 ? 100 : e.percentage), l = A(() => {
      var h;
      let d = 31.79;
      return (((h = t.value) == null ? void 0 : h.offsetWidth) || 0) * (a.value / 100) > d;
    }), o = A(() => {
      if (e.status) {
        if (e.status === "success")
          return "var(--a-success-color)";
        if (e.status === "prompt")
          return "var(--a-warning-color)";
        if (e.status === "error")
          return "var(--a-error-color)";
      } else
        return e.color;
    }), r = A(() => e.format ? e.format(e.percentage) : e.status && !e.textInside ? s(G, {
      name: e.status,
      style: {
        color: o.value,
        fontSize: "16px"
      }
    }, null) : a.value + "%"), u = (d, c) => {
      let h = "";
      for (let i = 0; i < c.length; i++) {
        const {
          color: v,
          percentage: m
        } = c[i];
        if (d <= m) {
          h = v;
          break;
        }
      }
      return h;
    }, f = A(() => {
      let d = "";
      return Array.isArray(o.value) ? d = u(a.value, o.value) : d = o.value, {
        width: a.value + "%",
        backgroundColor: d
      };
    });
    return () => s("div", {
      class: "a-progress-content"
    }, [s("div", {
      class: "a-progress-runway",
      ref: t,
      style: {
        height: e.strokeWidth + "px"
      }
    }, [s("div", {
      class: "a-progress-bar",
      style: f.value
    }, [e.textInside && l.value && s("div", {
      class: "a-percentage-inner-text"
    }, [s("span", null, [r.value])])]), e.textInside && !l.value && s("div", {
      class: "a-percentage-outer-text",
      style: {
        marginLeft: a.value + "%"
      }
    }, [r.value])]), !e.textInside && s("div", {
      class: "a-percentage-text"
    }, [s("span", null, [r.value])])]);
  }
}), $o = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), Co = $o(So);
const Vo = /* @__PURE__ */ S({
  name: "ADropdown",
  props: {
    trigger: {
      type: String,
      default: "hover"
    },
    hideOnClick: {
      type: Boolean,
      default: !0
    },
    splitButton: {
      type: Boolean,
      default: !1
    },
    type: {
      type: String,
      default: "primary"
    },
    placement: {
      type: String,
      default: "bottom"
    }
  },
  emits: ["command", "click"],
  setup(e, {
    emit: n,
    slots: t
  }) {
    const a = p(), l = () => t.default ? t.default() : "", o = () => t.dropdown ? t.dropdown() : "", r = () => s(Ve, {
      placement: e.placement,
      trigger: e.trigger,
      width: "max-content",
      padding: "0",
      ref: a
    }, {
      default: () => s("div", {
        class: "slot-dropdown"
      }, [o()]),
      reference: () => l()
    });
    return M("on-click-dropdown-item", (f) => {
      n("command", f), e.hideOnClick && a.value.hiddenPopover();
    }), () => s("div", {
      class: "a-dropdown"
    }, [e.splitButton ? s("div", {
      class: "split-button-content"
    }, [s("div", {
      onClick: () => n("click")
    }, [s(me, {
      class: "left",
      type: e.type
    }, {
      default: () => [t.default && t.default()]
    })]), s(Ve, {
      placement: e.placement,
      trigger: e.trigger,
      width: "max-content",
      padding: "0",
      ref: a
    }, {
      default: () => s("div", {
        class: "slot-dropdown"
      }, [o()]),
      reference: () => s(me, {
        class: "right",
        type: e.type
      }, {
        default: () => [s(G, {
          name: "arrow-down"
        }, null)]
      })
    })]) : r()]);
  }
}), Io = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), xo = Io(Vo);
const Ao = /* @__PURE__ */ S({
  name: "ADropdownMenu",
  setup(e, {
    emit: n,
    slots: t
  }) {
    return () => s("div", {
      class: "a-dropdown-menu-content"
    }, [t.default && t.default()]);
  }
}), _o = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), Do = _o(Ao);
const Eo = /* @__PURE__ */ S({
  name: "ADropdownItem",
  props: {
    command: [String, Number, Object],
    disabled: {
      type: Boolean,
      default: !1
    },
    divided: {
      type: Boolean,
      default: !1
    },
    icon: [String, Object]
  },
  setup(e, {
    emit: n,
    slots: t
  }) {
    const a = D("on-click-dropdown-item", (o) => {
    }), l = () => typeof e.icon == "string" ? s(G, {
      name: e.icon
    }, null) : typeof e.icon == "object" ? e.icon : "";
    return () => s(se, null, [e.divided && s("div", {
      class: "divided"
    }, null), s("div", {
      class: `a-dropdown-item ${e.disabled && "disable"}`,
      onClick: () => !e.disabled && a(e.command)
    }, [s("div", {
      style: {
        marginRight: "5px"
      }
    }, [l()]), ae(" "), t.default && t.default()])]);
  }
}), Bo = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), Mo = Bo(Eo);
const To = /* @__PURE__ */ S({
  name: "ADialog",
  props: {
    modelValue: {
      type: Boolean,
      default: !1
    },
    modal: {
      type: Boolean,
      default: !0
    },
    title: {
      type: String,
      default: ""
    },
    width: {
      type: String,
      default: "50%"
    },
    offsetTop: {
      type: String,
      default: "15%"
    },
    showCancelButton: {
      type: Boolean,
      default: !0
    },
    showConfirmButton: {
      type: Boolean,
      default: !0
    },
    cancelButtonText: {
      type: String,
      default: "取消"
    },
    confirmButtonText: {
      type: String,
      default: "确认"
    },
    center: {
      type: Boolean,
      default: !1
    },
    alignCenter: {
      type: Boolean,
      default: !1
    },
    destroyOnClose: {
      type: Boolean,
      default: !1
    },
    icon: {
      type: String,
      default: ""
    },
    zIndex: {
      type: Number,
      default: 1e3
    },
    closeOnClickModal: {
      type: Boolean,
      default: !0
    }
  },
  emits: ["update:modelValue", "cancel-click", "confirm-click", "close-click"],
  setup(e, {
    emit: n,
    slots: t,
    expose: a
  }) {
    const l = p(2e3), o = p(null), r = p(e.modelValue), u = A(() => ({
      width: e.width,
      top: e.alignCenter ? "40%" : e.offsetTop
    }));
    F(() => {
      setTimeout(() => {
        l.value = Oe();
      });
    }), I(() => e.modelValue, (v) => {
      setTimeout(() => {
        r.value = v;
      }, v ? 0 : 80), v ? e.modal && (document.body.style.overflow = "hidden") : e.modal && (document.body.style.overflow = "auto");
    });
    const f = () => {
      e.modal ? o.value.showModal() : o.value.show();
    }, d = () => o.value.close(), c = (v) => {
      n("update:modelValue", !1), n(v);
    }, h = (v) => {
      v.target.className === "a-dialog-content" && e.closeOnClickModal && c("close-click");
    };
    a({
      showModal: f,
      closeModal: d
    });
    const i = A(() => t.default ? e.destroyOnClose ? r.value && t.default() : t.default() : "");
    return () => s(Le, {
      to: "body"
    }, {
      default: () => [s(pe, {
        name: "dialog"
      }, {
        default: () => [z(s("div", {
          class: "a-dialog-content",
          onClick: (v) => h(v),
          style: {
            zIndex: l.value
          }
        }, [s("div", {
          class: "dialog-box",
          style: u.value
        }, [z(s("div", {
          class: "a-dialog-header",
          style: {
            justifyContent: e.center ? "center" : "left"
          }
        }, [s("div", {
          class: "title"
        }, [z(s(G, {
          style: "font-size:20px;margin-right:5px",
          name: e.icon
        }, null), [[Y, e.icon]]), e.title])]), [[Y, e.title]]), s("div", {
          class: "close-btn",
          onClick: () => c("close-click")
        }, [s(G, {
          name: "close"
        }, null)]), s("div", {
          class: "a-dialog-body"
        }, [i.value]), s("div", {
          class: "a-dialog-footer",
          style: {
            justifyContent: e.center ? "center" : "right"
          }
        }, [t.footer ? t.footer() : s(se, null, [z(s(me, {
          onClick: () => c("cancel-click")
        }, {
          default: () => [e.cancelButtonText]
        }), [[Y, e.showCancelButton]]), z(s(me, {
          style: "margin-right:0px",
          onClick: () => c("confirm-click"),
          type: "primary"
        }, {
          default: () => [e.confirmButtonText]
        }), [[Y, e.showConfirmButton]])])])])]), [[Y, r.value]])]
      })]
    });
  }
}), Ro = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), Lo = Ro(To);
const Po = {
  small: "8px",
  default: "12px",
  large: "16px"
}, Oo = /* @__PURE__ */ S({
  name: "ASpace",
  props: {
    size: {
      type: [String, Number],
      default: "small"
    },
    align: {
      type: String,
      default: "start"
    },
    direction: {
      type: String,
      default: "row"
    }
  },
  emits: [],
  setup(e, {
    slots: n,
    emit: t
  }) {
    const a = A(() => {
      switch (e.size) {
        case "small":
        case "default":
        case "large":
          return Po[e.size];
        default:
          return e.size + "px";
      }
    }), l = A(() => ({
      alignItems: e.align,
      gap: a.value,
      flexDirection: e.direction
    }));
    return () => s("div", {
      class: "a-space",
      style: l.value
    }, [n.default && n.default()]);
  }
}), No = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), xt = No(Oo);
const rt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ABreadcrumb: vo,
  ABreadcrumbItem: yo,
  AButton: me,
  ACheckbox: je,
  ACheckboxGroup: Rl,
  ACollapse: zt,
  ACollapseItem: Kt,
  ADatePicker: Rn,
  ADialog: Lo,
  ADrawer: Sl,
  ADropdown: xo,
  ADropdownItem: Mo,
  ADropdownMenu: Do,
  AForm: On,
  AFormItem: Kn,
  AIcon: G,
  AInput: Ee,
  AInputNumber: Zl,
  ALoading: Ql,
  AMenu: hl,
  AMenuItem: pl,
  APagination: so,
  APopover: Ve,
  AProgress: Co,
  ARadio: It,
  ARadioGroup: xa,
  ARate: en,
  ARotation: Qa,
  ARotationItem: lo,
  AScrollbar: Re,
  ASelect: $t,
  ASlider: ko,
  ASpace: xt,
  ASubMenu: bl,
  ASwitch: Wl,
  ATable: Da,
  ATabs: Gt,
  ATabsPanel: Qt,
  ATag: Gl,
  ATree: ha,
  Tooltip: $e
}, Symbol.toStringTag, { value: "Module" })), Be = {
  SUCCESS: "success",
  WARNING: "warning",
  Message: "message",
  ERROR: "error"
};
const Fo = /* @__PURE__ */ S({
  __name: "message",
  props: {
    type: {
      type: String,
      defualt: Be.Message,
      validator: (e) => Object.values(Be).includes(e)
    },
    message: {
      type: String,
      default: Be.Message
    },
    duration: {
      type: Number
    }
  },
  setup(e, { expose: n }) {
    let t = null;
    const a = e, l = p(!1), o = j({
      messageVisible: !1,
      top: 0
    }), { messageVisible: r, top: u } = _e(o), f = () => {
      switch (a.type) {
        case "error":
          return "icon-cuowu";
        case "success":
          return "icon-chenggong";
        case "warning":
          return "icon-tixingshixin";
        case "info":
          return "icon-xinxi-yuankuang";
        default:
          return "icon-xinxi-yuankuang";
      }
    }, d = (i) => (r.value = i, new Promise((v) => {
      t = setTimeout(() => {
        v(""), clearTimeout(t), t = null;
      }, 300);
    })), c = (i) => {
      l.value = i, l.value;
    };
    return n({
      isHover: l,
      setMessageVisible: d,
      setMessageTop: (i) => (o.top = i, i),
      height: 45,
      margin: 10
    }), (i, v) => (V(), J(pe, { name: "a-message-fade" }, {
      default: U(() => [
        fe(r) ? (V(), R("div", {
          key: 0,
          ref: "messageRef",
          style: oe({ top: fe(u) + "px" }),
          class: "a-message"
        }, [
          x("div", {
            class: "a-message-content",
            onMouseenter: v[0] || (v[0] = (m) => c(!0)),
            onMouseleave: v[1] || (v[1] = (m) => c(!1))
          }, [
            x("span", {
              style: { "margin-right": "10px", "font-size": "18px" },
              class: Z(`iconfont ${f()} ${a.type}`)
            }, null, 2),
            x("div", null, ee(a.message), 1)
          ], 32)
        ], 4)) : he("", !0)
      ]),
      _: 1
    }));
  }
}), Ie = p([]), it = function(e) {
  const n = We(Fo, e);
  Ho(n, e.duration);
};
Object.values(Be).forEach((e) => {
  it[e] = (n) => (n.type = e, it(n));
});
const Ho = (e, n) => {
  const t = document.createDocumentFragment(), a = e.mount(t);
  Ie.value.push(a), document.body.appendChild(t), ct(a), a.setMessageVisible(!0), I(
    () => Ie.value,
    () => {
      ct(a);
    }
  ), I(
    () => a.isHover,
    (l) => {
      !l && ut(e, a, n);
    },
    { deep: !0 }
  ), ut(e, a, n);
}, ut = (e, n, t) => {
  n.timer = setTimeout(() => {
    if (n.isHover) {
      clearTimeout(n.timer), n.timer = null;
      return;
    }
    n.setMessageVisible(!1).then(() => {
      e.unmount(), Ie.value = Ie.value.filter(
        (a) => a !== n
      ), clearTimeout(n.timer), n.timer = null;
    });
  }, t || 3e3);
}, ct = (e) => {
  const { setMessageTop: n, height: t, margin: a } = e, l = on(Ie.value, e);
  n(a * (l + 1) + t * l);
};
const zo = { class: "a-message-title" }, Wo = { class: "title" }, Yo = { class: "a-message-content" }, Ko = { class: "a-message-footer" }, jo = /* @__PURE__ */ S({
  __name: "message-box",
  props: {
    title: {
      type: String,
      default: "Message"
    },
    content: {
      type: String,
      default: "Message content"
    },
    showMessageBox: {
      type: Boolean,
      default: !1
    },
    showCancelBtn: {
      type: Boolean,
      default: !1
    },
    confirmBtnText: {
      type: String,
      default: "确认"
    },
    cancelBtnText: {
      type: String,
      default: "取消"
    },
    mantleClose: {
      type: Boolean,
      default: !1
    },
    field: {
      type: String,
      default: "confirm",
      validator: (e) => At.includes(e)
    }
  },
  setup(e, { expose: n }) {
    const t = e, a = p(2e3), l = j({
      visible: !1,
      promptValue: "",
      btnType: "confirm"
    }), { visible: o } = _e(l);
    F(() => {
      setTimeout(() => {
        a.value = Oe();
      });
    });
    const r = (v) => {
      l.visible = v, l.visible ? h() : i();
    }, u = () => {
      l.btnType = "confirm", r(!1);
    }, f = () => {
      l.btnType = "cancel", r(!1);
    }, d = () => {
      t.mantleClose && f();
    }, c = ({ fied: v }) => {
      switch (v) {
        case (!v || "confirm"):
          return Ge("span", null, t.content);
        case "prompt":
          return Ge("input", {
            value: l.promptValue,
            onInput: (m) => l.promptValue = m.target.value,
            class: "messageInput"
          });
      }
    }, h = () => {
      document.body.style.overflow = "hidden";
    }, i = () => {
      document.body.style.removeProperty("overflow");
    };
    return n({
      setVisible: r,
      state: l
    }), (v, m) => (V(), J(Le, { to: "body" }, [
      s(pe, { name: "modal" }, {
        default: U(() => [
          fe(o) ? (V(), R("div", {
            key: 0,
            class: "a-message-box",
            style: oe([{ zIndex: a.value }]),
            onClick: d
          }, [
            x("div", {
              class: "a-message-box-wrapper",
              onClick: m[0] || (m[0] = ht(() => {
              }, ["stop"]))
            }, [
              x("div", zo, [
                x("div", Wo, ee(e.title), 1),
                s(fe(G), { name: "close" })
              ]),
              x("div", Yo, [
                s(c, {
                  fied: t.field
                }, null, 8, ["fied"])
              ]),
              x("div", Ko, [
                s(fe(xt), null, {
                  default: U(() => [
                    e.showCancelBtn ? (V(), J(fe(me), {
                      key: 0,
                      onClick: f
                    }, {
                      default: U(() => [
                        ae(ee(e.cancelBtnText), 1)
                      ]),
                      _: 1
                    })) : he("", !0),
                    s(fe(me), {
                      type: "primary",
                      onClick: u
                    }, {
                      default: U(() => [
                        ae(ee(e.confirmBtnText), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ])
            ])
          ], 4)) : he("", !0)
        ]),
        _: 1
      })
    ]));
  }
}), At = ["confirm", "prompt"];
let ze = [];
const dt = (e) => {
  const n = We(jo, e);
  return new Promise((t, a) => {
    ze.length > 0 || Uo(n, { resolve: t, reject: a });
  });
};
At.forEach((e) => {
  dt[e] = (n) => (n.field = e, dt(n));
});
const Uo = (e, { resolve: n, reject: t }) => {
  const a = document.createDocumentFragment(), l = e.mount(a);
  document.body.appendChild(a), l.setVisible(!0), ze.push(l), I(l.state, (o) => {
    if (!o.visible) {
      switch (o.btnType) {
        case "cancel":
          t(!1);
          break;
        case "confirm":
          n(o.promptValue);
          break;
      }
      setTimeout(() => {
        e.unmount(l);
      }, 100), ze = [];
    }
  });
}, qo = {
  install: (e) => {
    for (let n in rt)
      e.use(rt[n]);
  }
};
export {
  vo as ABreadcrumb,
  yo as ABreadcrumbItem,
  me as AButton,
  je as ACheckbox,
  Rl as ACheckboxGroup,
  zt as ACollapse,
  Kt as ACollapseItem,
  Rn as ADatePicker,
  Lo as ADialog,
  Sl as ADrawer,
  xo as ADropdown,
  Mo as ADropdownItem,
  Do as ADropdownMenu,
  On as AForm,
  Kn as AFormItem,
  G as AIcon,
  Ee as AInput,
  Zl as AInputNumber,
  Ql as ALoading,
  hl as AMenu,
  pl as AMenuItem,
  it as AMessage,
  dt as AMessageBox,
  so as APagination,
  Ve as APopover,
  Co as AProgress,
  It as ARadio,
  xa as ARadioGroup,
  en as ARate,
  Qa as ARotation,
  lo as ARotationItem,
  Re as AScrollbar,
  $t as ASelect,
  ko as ASlider,
  xt as ASpace,
  bl as ASubMenu,
  Wl as ASwitch,
  Da as ATable,
  Gt as ATabs,
  Qt as ATabsPanel,
  Gl as ATag,
  ha as ATree,
  $e as Tooltip,
  qo as default
};
