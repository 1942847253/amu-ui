import { defineComponent as S, reactive as j, watch as x, computed as E, createVNode as o, Fragment as se, ref as p, onBeforeMount as ve, onBeforeUnmount as xe, provide as M, inject as B, onMounted as K, nextTick as ue, withDirectives as z, vModelDynamic as Dt, vShow as W, onUnmounted as ft, unref as fe, getCurrentScope as Et, onScopeDispose as Bt, Teleport as Le, createTextVNode as ae, openBlock as I, createElementBlock as R, normalizeStyle as oe, renderSlot as Pe, resolveComponent as q, createBlock as Q, withCtx as U, createElementVNode as D, renderList as Ae, normalizeClass as J, toDisplayString as ee, toRefs as _e, getCurrentInstance as De, Transition as pe, withModifiers as ht, createCommentVNode as he, toRef as Mt, createApp as Ye, resolveDirective as Tt, h as Ge } from "vue";
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
    }, s = () => {
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
    x(() => e.type, () => s());
    const r = E(() => {
      const {
        dashed: d,
        text: c,
        type: h,
        disabled: i,
        loading: v,
        ghost: m,
        round: y,
        circle: $,
        color: w,
        size: g
      } = e, k = e.full ? "100%" : "auto", b = d || m || c || h === "default" ? t.color : "var(--a-text-color-white)", V = i && h === "default" ? "var(--a-border-color)" : t.color, N = d || m ? "var(--a-bg-color)" : t.color, H = i ? t.color : t.hover, _ = v || c || i ? "" : w || t.color, F = i ? t.color : t.active;
      return {
        "--button-width": k,
        "--button-color": b,
        "--button-border-color": V,
        "--button-bg-color": N,
        "--button-hover-color": H,
        "--button-ripple-color": _,
        "--button-active-color": F,
        "--button-line-type": d ? "dashed" : "solid",
        "--button-masker-zIndex": v || i ? "100" : "0",
        "--button-cursor-type": i ? "not-allowed" : v ? "wait" : "",
        "--button-border-radius": y ? "34px" : $ ? "50%" : "3px",
        // 自定义按钮颜色
        "--button-self-define-filter": i ? "brightness(1)" : "brightness(.9)",
        "--button-self-define-opacity": i ? "0.5" : "0.8",
        "--button-self-define-color": m || c ? w : "var(--a-text-color-white)",
        "--button-self-define-bg-color": m || c ? "var(--a-bg-color)" : w,
        "--button-self-define-border-color": c ? "transparent" : w,
        // 圆形按钮宽高
        "--button-circle-width": g === "default" ? "34px" : g === "small" ? "28px" : "40px",
        "--button-circle-height": g === "default" ? "34px" : g === "small" ? "28px" : "40px"
      };
    }), u = () => {
      if (e.loading)
        return o("div", {
          class: "is-loading"
        }, [o(G, {
          class: "a-loading-icon",
          name: "loading"
        }, null)]);
      if (n.icon)
        return o(se, null, [n.icon()]);
      if (e.icon)
        return o(G, {
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
    return s(), () => o("button", {
      style: r.value,
      class: f()
    }, [o("div", {
      class: "a-button-content"
    }, [(e.loading || e.icon || n.icon) && o("div", {
      class: "icon-slot-content"
    }, [u()]), n.default ? n.default() : ""]), o("div", {
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
    return () => o("span", {
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
      s();
    }), xe(() => {
      T.$off(Te.UPDATE_MODEL_VALUE);
    });
    const s = () => {
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
    return M("model-value", e.modelValue), M("accordion", e.accordion), () => o("div", {
      class: "a-collapse-content"
    }, [a.map((u) => o(u, {
      currentName: l.value
    }, null))]);
  }
}), Ht = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), zt = Ht(Ft);
const Yt = /* @__PURE__ */ S({
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
    const a = B("model-value"), l = p(null), s = p(null), r = p(0);
    K(() => {
      r.value = s.value.offsetHeight, t = l.value.querySelector(".a-collapse-item-head-icon"), s.value.style.height = "0px", Array.isArray(a) ? a.includes(e.name) && f() : a && a === e.name && f();
    }), x(() => e.currentName, (c) => {
      c !== e.name && d();
    });
    const u = () => {
      Number(s.value.style.height.split("p")[0]) === 0 ? (f(), T.$emit(Te.UPDATE_MODEL_VALUE, Me.OPEN, e.name)) : (d(), T.$emit(Te.UPDATE_MODEL_VALUE, Me.CLOSE, e.name));
    }, f = () => {
      s.value.style.height = r.value + "px", t.style.transform = "rotate(90deg)";
    }, d = () => {
      t.style.transform = "rotate(0deg)", s.value.style.height = "0px";
    };
    return () => o(se, null, [o("div", {
      class: "a-collapse-item"
    }, [o("div", {
      ref: l,
      onClick: () => u(),
      class: "a-collapse-item-head"
    }, [o("div", {
      class: "a-collapse-item-head-title"
    }, [e.title]), o("div", {
      class: "a-collapse-item-head-icon iconfont icon-right"
    }, null)]), o("div", {
      ref: s,
      class: "a-collapse-item-content"
    }, [n.default ? n.default() : "", o("div", {
      style: "height:15px"
    }, null)])])]);
  }
}), Wt = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), Kt = Wt(Yt);
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
    }), a = p(), l = n.slots.default(), s = l.map((h) => {
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
    }), r = p(e.defaultActiveKey), u = e.position === "top" || e.position !== "left", f = E(() => {
      const h = u ? `translate3d(${t.barOffset}px,0px,0px)` : `translate3d(0px,${t.barOffset}px,0px)`;
      return {
        width: `${t.barWidth}px`,
        transform: h
      };
    });
    K(() => {
      d();
    });
    const d = () => {
      ue(() => {
        const h = s.findIndex((m) => m.key === r.value), i = a.value.querySelectorAll(".tabs-tab"), v = i[h];
        if (t.barWidth = v ? u ? v.offsetWidth : v.offsetHeight : 0, h > 0) {
          let m = 0;
          for (let y = 0; y < h; y++) {
            const $ = i[y];
            m += u ? $.offsetWidth : $.offsetHeight;
          }
          t.barOffset = m;
        } else
          t.barOffset = 0;
      });
    }, c = (h) => {
      r.value = h, d(), n.emit("change", h);
    };
    return () => o("div", {
      class: "tabs-content",
      style: u ? {
        flexDirection: "column"
      } : ""
    }, [o("div", {
      class: "tabs"
    }, [o("div", {
      ref: a,
      class: "tabs-nav-wrap",
      style: u ? {
        borderBottom: "1px solid var(--a-border-color)"
      } : {
        borderRight: "1px solid var(--a-border-color)"
      }
    }, [o("div", {
      class: u ? "tabs-inv-bar-top" : "tabs-inv-bar-left",
      style: f.value
    }, null), o("div", {
      class: "tab-list",
      style: u ? "" : {
        flexDirection: "column",
        alignItems: "flex-end"
      }
    }, [s.map((h) => {
      const {
        key: i,
        title: v
      } = h;
      return o("div", {
        class: `tabs-tab ${i === r.value ? "tabs-tab-active" : ""}`,
        key: i,
        onClick: () => c(i)
      }, [v]);
    })])])]), o("div", {
      class: "pane-content"
    }, [l.filter((h) => {
      const {
        props: i
      } = h, {
        key: v
      } = i;
      return r.value === v && o(h, null, null);
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
    return () => o("div", null, [n.default ? n.default() : ""]);
  }
}), Xt = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), Zt = Xt(qt);
let ge = /* @__PURE__ */ function(e) {
  return e.ENTER = "enter", e.CLICK = "click", e;
}({}), ke = /* @__PURE__ */ function(e) {
  return e.STAR_ON = "iconfont icon-xingxing", e.STAR_OFF = "iconfont icon-xingxing1", e;
}({});
const Qt = /* @__PURE__ */ S({
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
    K(() => {
      l(), u();
    });
    const l = () => {
      for (let f = 0; f < e.modelValue; f++)
        a.value.push(f);
    }, s = (f, d = ge.ENTER) => {
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
    return () => o("div", {
      class: "a-rate-content",
      style: `cursor:${e.disabled ? "not-allowed" : "pointer"}`,
      ref: t,
      onMouseleave: () => u()
    }, [new Array(e.max).fill("").map((f, d) => o("div", {
      class: "a-rate-item",
      index: d,
      onMouseenter: (c) => s(c),
      onClick: (c) => s(c, ge.CLICK)
    }, [o("div", {
      index: d,
      style: {
        color: e.disabled ? "#c8c9cc" : e.color
      },
      class: `iconfont ${ke.STAR_OFF}`
    }, null)]))]);
  }
}), Jt = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), en = Jt(Qt);
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
    const l = p(e.modelValue === void 0 ? e.value : e.modelValue), s = B("prop", ""), r = p(e.type), u = p(!1), f = p(!1), d = p(!1), c = p("var(--a-primary-color)"), h = p("var(--a-border-color)"), i = p("var(--a-primary-color)"), v = p("var(--a-primary-color)"), m = p(null), y = p(null), $ = p(null), w = B("uniKey", null), g = B("rules", null), k = B("model", null), b = B("changeErrorMessage", null), V = B("shrinkFormErrorSwitchFn", null), N = B("shrinkSelectMenuSwitchFn", null), H = E(() => ({
      width: e.width ? e.width + "px" : "100%",
      height: e.height ? e.height + "px" : "34px",
      textAlign: e.textCenter ? "center" : "",
      backgroundColor: e.disabled ? "var(--a-bg-grey-color)" : "",
      "--input-text-color": e.disabled ? "var(--a-text-disable-color)" : "var(--a-text-color)"
    })), _ = E(() => e.clearable || e.isDate || e.isSearch || e.isSelector || e.type === "password");
    x(() => [e.width, e.height], () => {
      F();
    }, {
      deep: !0
    }), x(() => e.modelValue, (O) => {
      l.value = O;
    }), x(() => e.value, (O) => {
      l.value = O;
    }), K(() => {
      F();
    });
    const F = () => {
      m.value.style.flexGrow = e.width ? "0" : "1";
    }, C = () => {
      e.type === "password" && e.showPassword ? (r.value = r.value === "password" ? "text" : "password", f.value = !f.value) : (l.value = "", n("update:modelValue", l.value)), setTimeout(() => {
        y.value.focus();
      });
    };
    x(() => l.value, () => {
      l.value === "" ? u.value = !1 : u.value = !0;
    });
    const A = (O) => {
      const X = O.target, Z = e.type === "number" ? X.value === "" ? X.value : Number(X.value) : X.value;
      l.value = Z, n("update:modelValue", l.value), n("change", l.value), Ne("change");
    }, L = (O) => {
      d.value = !1, n("blur", O), Ne("blur"), $.value && ($.value.$el.style.transform = "rotate(0deg)");
    }, P = (O) => {
      d.value = !0, l.value.toString().length > 0 && (u.value = !0), $.value && ($.value.$el.style.transform = "rotate(-180deg)"), N && N.value(1, 0.2), n("focus", O);
    }, te = () => o("div", null, [u.value && o("span", {
      onMousedown: () => C(),
      class: "iconfont icon-guanbi"
    }, null)]), re = () => o("div", null, [u.value && o("div", {
      onMousedown: () => C()
    }, [o(G, {
      name: f.value ? "select" : "hide"
    }, null)])]), ne = () => o("div", {
      onMousedown: () => C()
    }, [o(G, {
      name: "calendar"
    }, null)]), le = () => o("div", {
      onMousedown: () => C()
    }, [o(G, {
      name: "search"
    }, null)]), ce = () => o("div", {
      onMousedown: () => C()
    }, [o(G, {
      name: "arrow-down",
      ref: $
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
      if (u.value = !1, g && g[s])
        for (let X = 0; X < g[s].length; X++) {
          const Z = g[s][X];
          if (Z.trigger === O) {
            if (Z.required === !0) {
              if (l.value === "") {
                ie("error", Z.message);
                return;
              }
              ie();
            }
            if (l.value.toString().length < Z.min || l.value.toString().length > Z.max) {
              ie("error", Z.message);
              return;
            } else
              ie();
            Z.validator && typeof Z.validator == "function" && Z.validator(Z, l.value, (Ue) => {
              Ue ? ie("error", Ue.message) : ie();
            });
          }
        }
    }, _t = (O) => {
      O.key === "Enter" && n("enter", l.value);
    }, ie = (O = "right", X = "") => {
      O === "error" ? (c.value = "var(--a-error-color)", h.value = "var(--a-error-color)", i.value = "var(--a-error-color)", v.value = "var(--a-error-color)", b(X), V.value(1, 0.2)) : (c.value = "var(--a-primary-color)", h.value = "var(--a-border-color)", i.value = "var(--a-primary-color)", v.value = "var(--a-primary-color)", V.value(0, 0.2));
    };
    return T.$on(`change-input-style-${w}-${s}`, (O = "right", X = "") => {
      ie(O, X);
    }), T.$on(`reset-input-value-${w}-${s}`, () => {
      e.isSelector || (l.value = k[s], n("update:modelValue", l.value)), n("resetValue", k[s]), ie();
    }), xe(() => {
      T.$off(`reset-input-value-${w}-${s}`);
    }), a({
      setInputStatusStyle: ie
    }), () => o("div", {
      class: "a-input-content",
      style: {
        "--border-focus-shadow": d.value ? v.value : "",
        "--input-focus-opacity": d.value ? 0.2 : 1,
        cursor: e.disabled ? "no-drop" : ""
      }
    }, [o("div", {
      class: "a-input-wrapper",
      style: {
        backgroundColor: e.disabled ? "var(--a-bg-grey-color)" : "",
        pointerEvents: e.disabled ? "none" : "auto",
        "--border-focus-color": c.value,
        "--border-color": h.value,
        "--border-hover-color": i.value
      },
      ref: m
    }, [z(o("input", {
      style: H.value,
      placeholder: e.placeholder,
      class: "input",
      onInput: A,
      readonly: e.readonly,
      onFocus: (O) => P(O),
      onBlur: (O) => L(O),
      onKeydown: (O) => _t(O),
      disabled: e.disabled,
      type: r.value,
      "onUpdate:modelValue": (O) => l.value = O,
      ref: y
    }, null), [[Dt, l.value]])]), z(o("div", {
      class: "a-input-slot",
      style: {
        backgroundColor: e.disabled ? "var(--a-bg-grey-color)" : ""
      }
    }, [de()]), [[W, _.value]])]);
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
    return () => o("div", {
      class: "a-date-selector-input"
    }, [o(Ee, {
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
    return n.set(e, l), a ? e.forEach((s, r) => {
      l[r] = He(e[r], n);
    }) : Object.keys(e).forEach((s) => {
      l[s] = He(e[s], n);
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
}, un = (e) => {
  try {
    return !!e;
  } catch {
    return !1;
  }
};
function cn(e, n) {
  return new Date(e, n - 1, 1).getDay();
}
function We(e, n) {
  return new Date(e, n, 0).getDate();
}
function mt(e, n) {
  const t = cn(e, n);
  let a = We(e, n - 1), l = [];
  for (; l.length < t; )
    l.push(a), a = a - 1;
  return l.reverse();
}
function dn(e, n) {
  const t = mt(e, n), l = 42 - (We(e, n) + t.length);
  let s = [];
  for (let r = 1; r <= l; r++)
    s.push(r);
  return s;
}
function Ke(e) {
  const n = e ? new Date(e) : /* @__PURE__ */ new Date();
  return [n.getFullYear(), n.getMonth() + 1, n.getDate()];
}
function fn(e, n, t) {
  const a = [e, n, t];
  for (let l = 1; l < a.length; l++)
    a[l] < 10 && (a[l] = "0" + a[l]);
  return a.join("-");
}
const hn = ["日", "一", "二", "三", "四", "五", "六"], mn = (e, n) => {
  const t = mt(e, n), a = We(e, n), l = dn(e, n), s = [], [r, u, f] = Ke();
  for (let c = 1; c <= a; c++) {
    const h = r === e && u === n && f === c;
    s.push({
      day: c,
      style: h ? "day current-day current" : "day current-day",
      isRestDay: !1,
      year: e,
      month: n
    });
  }
  const d = [
    ...Ze("last", t, e, n),
    ...s,
    ...Ze("next", l, e, n)
  ];
  return [
    hn,
    d,
    sn(d, 7)
  ];
}, Ze = (e, n, t, a) => {
  let l = [];
  return n.forEach((s) => {
    const r = {
      day: s,
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
const vn = /* @__PURE__ */ S({
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
    const t = B("dateState"), a = B("update-modelValue"), l = j({
      weekDays: [],
      CalendarItemChunkArr: [],
      CalendarItemObjArr: []
    });
    x(() => t, () => {
      s();
    }, {
      deep: !0
    }), ve(() => {
      s();
    });
    const s = () => {
      const {
        currentYear: f,
        currentMonth: d
      } = t, [c, h, i] = mn(f, d);
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
      return o("td", {
        onClick: () => a(d),
        class: h
      }, [o("div", {
        class: i && "checked-day"
      }, [c])]);
    });
    return () => o("div", {
      class: "a-calendar-content"
    }, [o("table", null, [o("thead", null, [o("tr", null, [l.weekDays.map((f) => o("th", null, [f]))])]), o("tbody", null, [l.CalendarItemChunkArr.map((f) => o("tr", null, [u(f)]))])])]);
  }
}), pn = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), vt = pn(vn);
const gn = /* @__PURE__ */ S({
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
    const a = p(), l = p(), s = p(), r = p(), u = p(), f = p(!1), d = p(!1), c = p(!0), h = p(!0), i = p(0), v = p(0), m = p(0), y = p(0), $ = p("vertical");
    K(() => {
      w(), document.addEventListener("mousemove", N), document.addEventListener("mouseup", H);
    }), ft(() => {
      document.removeEventListener("mousemove", N), document.removeEventListener("mouseup", H);
    });
    const w = () => {
      ue(() => {
        g(), k();
      });
    }, g = () => {
      const {
        clientHeight: C,
        scrollHeight: A
      } = a.value;
      if (C === A) {
        c.value = !1;
        return;
      }
      const L = C / A * 100 + "%";
      s.value.style.height = L, e.trigger === "hover" && (l.value.style.opacity = "0");
    }, k = () => {
      if (e.xScrollable) {
        const {
          clientWidth: C,
          scrollWidth: A
        } = a.value;
        if (C === A) {
          h.value = !1;
          return;
        }
        const L = C / A * 100 + "%";
        u.value.style.width = L, e.trigger === "hover" && (r.value.style.opacity = "0");
      }
    }, b = (C) => {
      const A = a.value, L = l.value, P = s.value;
      if (e.onScroll && e.onScroll(C), !A || !L || !P)
        return;
      const te = A.scrollTop / (A.scrollHeight - A.clientHeight), re = L.clientHeight, ne = P.clientHeight, le = te * (re - ne);
      P.style.top = `${le}px`;
    }, V = (C, A) => {
      $.value = A, f.value = !0, A === "vertical" ? (i.value = C.clientY, v.value = s.value.offsetTop) : (m.value = C.clientX, y.value = u.value.offsetLeft);
    }, N = (C) => {
      if (!f.value)
        return;
      const A = a.value;
      if ($.value === "vertical") {
        const L = l.value, P = s.value, te = A.clientHeight, re = C.clientY - i.value, ne = L.clientHeight, le = Math.min(Math.max(0, v.value + re), ne - P.clientHeight), ce = le / (ne - P.clientHeight), de = A.scrollHeight - te;
        A.scrollTop !== ce * de && (A.scrollTop = ce * de), P.style.top = `${le}px`;
      } else {
        const L = r.value, P = u.value, te = A.clientWidth, re = C.clientX - m.value, ne = L.clientWidth, le = Math.min(Math.max(0, y.value + re), ne - P.clientWidth), ce = le / (ne - P.clientWidth), de = A.scrollWidth - te;
        A.scrollLeft !== ce * de && (A.scrollLeft = ce * de), P.style.left = `${le}px`;
      }
    }, H = () => {
      f.value !== !1 && (f.value = !1, l.value && !d.value && e.trigger !== "none" && (e.xScrollable ? r.value.style.opacity = "0" : l.value.style.opacity = "0"));
    }, _ = () => {
      e.trigger !== "none" && (d.value = !0, c.value && (l.value.style.opacity = "1"), h.value && e.xScrollable && (r.value.style.opacity = "1"));
    }, F = () => {
      e.trigger !== "none" && (d.value = !1, f.value || (c.value && (l.value.style.opacity = "0"), h.value && e.xScrollable && (r.value.style.opacity = "0")));
    };
    return () => o("div", {
      class: "a-scrollbar",
      onMouseenter: _,
      onMouseleave: F
    }, [o("div", {
      class: "a-scrollbar-container",
      ref: a,
      onScroll: (C) => b(C)
    }, [o("div", {
      class: "a-scrollbar-content",
      style: {
        width: e.xScrollable ? "fit-content" : "none"
      }
    }, [t.default && t.default()])]), c.value && o("div", {
      ref: l,
      class: ["a-scrollbar-rail", "a-scrollbar-rail--vertical"]
    }, [o("div", {
      class: "a-scrollbar-rail__scrollbar",
      ref: s,
      onMousedown: (C) => V(C, "vertical")
    }, null)]), e.xScrollable && h.value && o("div", {
      ref: r,
      class: ["a-scrollbar-rail", "a-scrollbar-rail--horizontal"]
    }, [o("div", {
      class: "a-scrollbar-rail__scrollbar",
      ref: u,
      onMousedown: (C) => V(C, "horizontal")
    }, null)])]);
  }
}), yn = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), Re = yn(gn);
const bn = /* @__PURE__ */ S({
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
    const t = B("dateSelectContentKey"), a = p(), l = p(), s = j({
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
    return () => o("div", {
      class: "a-date-select-content",
      id: t
    }, [o(Re, {
      style: {
        height: "248px"
      },
      ref: a
    }, {
      default: () => [o("div", {
        class: "select-year"
      }, [s.selectYear.map((c, h) => o("div", {
        onClick: () => u(c),
        key: h,
        class: `year select-year-index-${c} ${d("year", c) && "current"}`
      }, [c]))])]
    }), o(Re, {
      style: {
        height: "248px"
      },
      ref: l
    }, {
      default: () => [o("div", {
        class: "select-month"
      }, [s.selectMonth.map((c, h) => o("div", {
        onClick: () => f(c),
        key: h,
        class: `month select-month-index-${c} ${d("month", c) && "current"}`
      }, [c])), o("div", {
        style: "height:212px"
      }, null)])]
    })]);
  }
}), wn = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), kn = wn(bn);
var Qe;
const pt = typeof window < "u", Sn = (e) => typeof e == "string", gt = () => {
}, $n = pt && ((Qe = window == null ? void 0 : window.navigator) == null ? void 0 : Qe.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function yt(e) {
  return typeof e == "function" ? e() : fe(e);
}
function Cn(e) {
  return e;
}
function In(e) {
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
  if (Sn(e[0]) || Array.isArray(e[0]) ? ([t, a, l] = e, n = bt) : [n, t, a, l] = e, !n)
    return gt;
  Array.isArray(t) || (t = [t]), Array.isArray(a) || (a = [a]);
  const s = [], r = () => {
    s.forEach((c) => c()), s.length = 0;
  }, u = (c, h, i, v) => (c.addEventListener(h, i, v), () => c.removeEventListener(h, i, v)), f = x(() => [Se(n), yt(l)], ([c, h]) => {
    r(), c && s.push(...t.flatMap((i) => a.map((v) => u(c, i, v, h))));
  }, { immediate: !0, flush: "post" }), d = () => {
    f(), r();
  };
  return In(d), d;
}
let Je = !1;
function wt(e, n, t = {}) {
  const { window: a = bt, ignore: l = [], capture: s = !0, detectIframe: r = !1 } = t;
  if (!a)
    return;
  $n && !Je && (Je = !0, Array.from(a.document.body.children).forEach((i) => i.addEventListener("click", gt)));
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
    }, { passive: !0, capture: s }),
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
var Vn = Object.defineProperty, lt = Object.getOwnPropertySymbols, xn = Object.prototype.hasOwnProperty, An = Object.prototype.propertyIsEnumerable, at = (e, n, t) => n in e ? Vn(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, _n = (e, n) => {
  for (var t in n || (n = {}))
    xn.call(n, t) && at(e, t, n[t]);
  if (lt)
    for (var t of lt(n))
      An.call(n, t) && at(e, t, n[t]);
  return e;
};
const Dn = {
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
_n({
  linear: Cn
}, Dn);
const En = (e, n, t) => {
  let a = 0, l = 0, s = t;
  if (!e)
    return {
      placement: s,
      top: a,
      left: l
    };
  const r = n, u = e.getBoundingClientRect();
  switch (s) {
    case "top":
      u.top < r.clientHeight && (s = "bottom");
      break;
    case "bottom":
      window.innerHeight - u.bottom < r.clientHeight && (s = "top");
      break;
    case "left":
      u.left < r.clientWidth && (s = "right");
      break;
    case "right":
      window.innerWidth - u.right < r.clientWidth && (s = "left");
      break;
    default:
      s = t;
  }
  switch (s) {
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
    placement: s,
    top: a,
    left: l
  };
};
const Oe = () => {
  var t, a;
  let e = 2e3;
  un((a = (t = window.$) == null ? void 0 : t.amuui) == null ? void 0 : a.zIndex) ? e = window.$.amuui.zIndex + 1 : (window.$ = { amuui: {} }, window.$.amuui.zIndex = e);
  function n(l) {
    window.$.amuui.zIndex = l;
  }
  return {
    ZIndex: e,
    setZIndex: n
  };
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
    const {
      ZIndex: l,
      setZIndex: s
    } = Oe(), r = p(l);
    s(r.value);
    let u = null;
    const f = p(null), d = p(null), c = p(l);
    s(c.value);
    const h = p("var(--a-bg-color)"), i = p("bottom"), v = p(!1), m = p(e.visible), y = p({
      left: 0,
      top: 0
    });
    x(() => e.visible, (_) => {
      w(d.value.firstElementChild, e.placement), setTimeout(() => {
        m.value = _;
      }, _ ? 120 : 0);
    });
    const $ = E(() => {
      let _ = "", F = "";
      switch (i.value) {
        case "bottom":
          _ = "scaleY", F = "center top";
          break;
        case "left":
          _ = "scaleX", F = "right";
          break;
        case "top":
          _ = "scaleY", F = "center bottom";
          break;
        case "right":
          _ = "scaleX", F = "left";
          break;
      }
      let C = m.value === null ? v.value : m.value;
      return {
        zIndex: c.value,
        left: y.value.left + "px",
        top: y.value.top + "px",
        backgroundColor: h.value,
        transition: `transform ${C ? 0.18 : 0.1}s ease`,
        transform: `${_}(${C ? 1 : 0})`,
        // 面板收起
        transformOrigin: F,
        width: e.width,
        minWidth: e.width || "150px",
        padding: e.padding
      };
    }), w = (_, F) => {
      const {
        top: C,
        left: A,
        placement: L
      } = En(_, f.value, F);
      i.value = L, y.value = {
        top: C,
        left: A
      };
    }, k = rn(() => w(d.value.firstElementChild, e.placement), 0);
    K(() => {
      const _ = d.value.firstElementChild;
      e.trigger === "click" ? (_.addEventListener("click", b), wt(_, (F) => {
        var L;
        const C = F.target, A = (L = f.value) == null ? void 0 : L.contains(C);
        n("isClickElementInPopover", A), C.className === "a-popover" || A || V();
      })) : e.trigger === "hover" && (_.addEventListener("mouseenter", b), _.addEventListener("mouseleave", V), f.value.addEventListener("mouseenter", b), f.value.addEventListener("mouseleave", V)), w(d.value.firstElementChild, e.placement), window.addEventListener("resize", k), window.addEventListener("scroll", k);
    }), xe(() => {
      const _ = d.value.firstElementChild;
      window.removeEventListener("scroll", k), _.removeEventListener("mouseenter", b), _.removeEventListener("mouseleave", V), _.removeEventListener("click", b), f.value.removeEventListener("mouseenter", b), f.value.removeEventListener("mouseleave", V);
    });
    const b = () => {
      m.value === null && u && (clearTimeout(u), u = null), w(d.value.firstElementChild, e.placement), v.value = !0;
    }, V = () => {
      m.value === null ? u = setTimeout(() => {
        v.value = !1, u = null;
      }, 250) : v.value = !1;
    }, N = () => t.reference ? t.reference() : "", H = () => o("div", {
      class: "a-popover-inner-content"
    }, [z(o("div", {
      class: "title"
    }, [e.title]), [[W, e.title]]), z(o("div", {
      class: "content"
    }, [t.default && t.default() || e.content]), [[W, t.default || e.content]])]);
    return a({
      showPopover: b,
      hiddenPopover: V,
      popoverRef: f
    }), () => o("div", {
      class: "a-popover-content"
    }, [o("div", {
      class: "a-reference",
      ref: d
    }, [N()]), o(Le, {
      to: "body"
    }, {
      default: () => [o("div", {
        ref: f,
        class: "a-popover",
        style: $.value
      }, [H()])]
    })]);
  }
}), Bn = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), Ie = Bn(kt);
let ye = /* @__PURE__ */ function(e) {
  return e.TYPE_YEAR = "year", e.TYPE_MONTH = "month", e;
}({}), be = /* @__PURE__ */ function(e) {
  return e.FLAG_ADD = "add", e.FLAG_DECREASE = "decrease", e;
}({});
const Mn = /* @__PURE__ */ S({
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
    B("dateSelectContentKey");
    const t = p(null), a = p(), l = j({
      currentYear: 0,
      currentMonth: 0,
      currentDate: 0
    });
    x(() => e.dateValue, () => {
      s();
    }), x(() => e.isInputBlur, (c) => {
      s();
    });
    const s = () => {
      const [c, h, i] = Ke(e.dateValue);
      l.currentYear = c, l.currentMonth = h, l.currentDate = i;
    };
    s();
    const r = (c, h) => {
      switch (c) {
        case ye.TYPE_YEAR:
          h === be.FLAG_ADD ? l.currentYear++ : l.currentYear--;
          break;
        case ye.TYPE_MONTH:
          if (h === be.FLAG_ADD) {
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
        popoverRef: c
      } = a.value, h = c.querySelector(".select-year"), i = c.querySelector(".select-month"), v = c.querySelector(`.select-year-index-${l.currentYear}`), m = c.querySelector(`.select-month-index-${l.currentMonth}`);
      setTimeout(() => {
        h.scrollTo({
          behavior: "auto",
          top: v.offsetTop - 5
        }), i.scrollTo({
          behavior: "auto",
          top: m.offsetTop - 5
        });
      }, 50);
    }, f = (c, h) => {
      c === "year" ? l.currentYear = h : l.currentMonth = h;
    }, d = (c) => {
      c || e.showDateSelectFn(!1);
    };
    return M("dateState", l), () => o("div", {
      class: "a-date-menu",
      ref: t
    }, [o("div", {
      class: "a-date-menu-head"
    }, [o("div", {
      class: "head-left"
    }, [o("span", {
      onClick: () => r(ye.TYPE_YEAR, be.FLAG_DECREASE),
      class: "two iconfont icon-doubleleft"
    }, null), o("span", {
      onClick: () => r(ye.TYPE_MONTH, be.FLAG_DECREASE),
      class: "one iconfont icon-left1"
    }, null)]), o("div", {
      class: "head-center"
    }, [o(Ie, {
      onIsClickElementInPopover: (c) => d(c),
      ref: a,
      trigger: "click",
      visible: e.showDateSelect,
      width: "max-content",
      padding: "0"
    }, {
      reference: () => o("div", {
        onClick: () => u(),
        tabindex: "1",
        style: {
          backgroundColor: e.showDateSelect ? "var(--a-bg-hover-color)" : ""
        },
        class: "year-month"
      }, [l.currentYear, ae(" "), l.currentMonth, ae("月")]),
      default: () => o(kn, {
        updateYearOrMonthFn: f,
        currentYear: l.currentYear,
        currentMonth: l.currentMonth,
        dateValue: e.dateValue
      }, null)
    })]), o("div", {
      class: "head-right"
    }, [o("span", {
      onClick: () => r(ye.TYPE_MONTH, be.FLAG_ADD),
      class: "one iconfont icon-right-copy"
    }, null), o("span", {
      onClick: () => r(ye.TYPE_YEAR, be.FLAG_ADD),
      class: "two iconfont icon-doubleright-copy"
    }, null)])]), o("div", {
      class: "a-date-menu-body"
    }, [o(vt, {
      dateValue: e.dateValue
    }, null)])]);
  }
});
const Tn = /* @__PURE__ */ S({
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
    const t = we(), a = we(), l = p(!0), s = p(!1), r = p(null), u = (i, v = !0) => {
      const {
        year: m,
        month: y,
        day: $
      } = i, w = fn(m, y, $);
      n("update:modelValue", w), v && f(0);
    }, f = (i) => {
      l.value = i === 0;
    }, d = (i) => {
      typeof i == "boolean" && (s.value = i);
    }, c = (i) => {
      !i && !s.value && (l.value = !0);
    }, h = (i) => {
      n("update:modelValue", i);
    };
    return M("model-value", e.modelValue), M("update-modelValue", u), M("dateSelectContentKey", a), () => o("div", {
      class: "a-datepicker-content",
      id: `${t}`,
      ref: r
    }, [o(Ie, {
      trigger: "click",
      visible: !l.value,
      width: "max-content",
      padding: "0",
      onIsClickElementInPopover: (i) => c(i)
    }, {
      reference: () => o(qe, {
        showDateSelect: s.value,
        showDateSelectFn: d,
        shrinkCalendarSwitchFn: f,
        value: e.modelValue,
        onResetValue: (i) => h(i)
      }, null),
      default: () => o(Mn, {
        showDateSelectFn: d,
        showDateSelect: s.value,
        dateValue: e.modelValue,
        isInputBlur: l.value
      }, null)
    })]);
  }
}), Rn = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), Ln = Rn(Tn);
const Pn = /* @__PURE__ */ S({
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
    const s = we(), r = p(null), u = JSON.parse(JSON.stringify(e.model));
    M("model", u), M("rules", e.rules), M("uniKey", s), K(() => {
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
        const m = `change-input-style-${s}-`;
        Object.keys(e.rules).forEach((y) => {
          for (let $ = 0; $ < e.rules[y].length; $++) {
            const w = e.rules[y][$], g = e.model[y] + "";
            if (w.required === !0)
              if (g === "") {
                T.$emit(m + y, "error", w.message), i(w.message), v = !1;
                return;
              } else
                T.$emit(m + y);
            if (w.min || w.max)
              if (g.length < w.min || g.length > w.max) {
                T.$emit(m + y, "error", w.message), i(w.message), v = !1;
                return;
              } else
                T.$emit(m + y);
            w.validator && typeof w.validator == "function" && w.validator(w, g, (k) => {
              if (k) {
                T.$emit(m + y, "error", k.message), i(k.message), v = !1;
                return;
              } else
                T.$emit(m + y);
            });
          }
        }), v && h(v);
      }),
      resetFields: () => {
        const h = `reset-input-value-${s}-`;
        Object.keys(e.model).forEach((i) => {
          T.$emit(h + i);
        });
      }
    }), () => o("div", {
      class: "a-form-content",
      ref: r
    }, [t.default()]);
  }
}), On = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), Nn = On(Pn);
const Fn = S({
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
    K(() => {
      l(), e.shrinkViewSwitch(s);
    });
    const l = () => {
      const r = document.getElementById(
        `${e.contentID}`
      );
      r && wt(r, () => {
        s(
          0
          /* COLSE */
        );
      });
    }, s = (r, u) => {
      a.value.style.transition = "all 0.2s ease", a.value.style.transform = `scaleY(${r})`, n("shrink", r);
    };
    return {
      shrinkRef: a
    };
  }
}), Y = (e, n) => {
  const t = e.__vccOpts || e;
  for (const [a, l] of n)
    t[a] = l;
  return t;
};
function Hn(e, n, t, a, l, s) {
  return I(), R("div", {
    ref: "shrinkRef",
    class: "a-shrink-box",
    style: oe(`z-index:${e.zIndex}`)
  }, [
    Pe(e.$slots, "default")
  ], 4);
}
const zn = /* @__PURE__ */ Y(Fn, [["render", Hn]]), Yn = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), St = Yn(zn);
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
    const a = B("model"), l = p("Please enter the content first"), s = p(null), r = p();
    M("shrinkFormErrorSwitchFn", r), M("changeErrorMessage", (d) => {
      l.value = d;
    }), K(() => {
    });
    const u = E(() => Object.keys(a).includes(e.prop)), f = (d) => {
      r.value = d;
    };
    return () => o("div", {
      class: "a-form-item-content"
    }, [o("label", {
      class: "a-form-item-label",
      ref: s
    }, [u.value && o("span", {
      class: "iconfont icon-bitian"
    }, null), e.label]), o("div", {
      class: "a-form-item-slot"
    }, [t.default(), o(St, {
      shrinkViewSwitch: f,
      zIndex: "0"
    }, {
      default: () => [o("div", {
        class: "a-form-item-error"
      }, [l.value])]
    })])]);
  }
}), Kn = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), jn = Kn(Wn);
const Un = S({
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
    const t = p(e.inputValue), a = B("shrinkSelectMenuFn", () => {
    }), l = B("updateInputValue", () => {
    }), s = B("updateLocalValue", () => {
    }), r = (c) => {
      const i = c.target.value;
      n("searchOptions", i);
    };
    return x(
      () => e.inputValue,
      (c) => {
        t.value = c;
      }
    ), {
      value: t,
      setValue: () => {
        s();
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
}), Gn = { class: "a-selector-input" };
function qn(e, n, t, a, l, s) {
  const r = q("AInput");
  return I(), R("div", Gn, [
    o(r, {
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
const Xn = /* @__PURE__ */ Y(Un, [["render", qn]]);
const Zn = S({
  name: "DataTip",
  components: {},
  directives: {},
  emits: [],
  setup(e, { emit: n }) {
    return {};
  }
}), Qn = { class: "no-data-tip" };
function Jn(e, n, t, a, l, s) {
  return I(), R("div", Qn, "未找到匹配的内容");
}
const el = /* @__PURE__ */ Y(Zn, [["render", Jn]]);
const tl = S({
  name: "SelectorMenu",
  components: {
    NoDataTip: el
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
    const t = p([]), a = B("shrinkSelectMenuFn", () => {
    });
    K(() => {
      t.value = e.options;
    }), x(
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
}), nl = { class: "selector-menu" }, ll = ["onClick"], al = { class: "label" };
function ol(e, n, t, a, l, s) {
  const r = q("AIcon"), u = q("NoDataTip"), f = q("AScrollbar");
  return I(), Q(f, { style: { "max-height": "215px", "max-width": "223px" } }, {
    default: U(() => [
      D("div", nl, [
        e.searchData.length > 0 ? (I(!0), R(se, { key: 0 }, Ae(e.searchData, (d, c) => (I(), R("div", {
          class: J(`menu-item ${e.localValue === d.text ? "menu-checked" : ""}`),
          onClick: (h) => e.setItemValue(d),
          onMousedown: n[0] || (n[0] = () => {
          }),
          key: c
        }, [
          D("div", al, ee(d && d.text), 1),
          z(o(r, { name: "select-bold" }, null, 512), [
            [W, e.localValue === d.text]
          ])
        ], 42, ll))), 128)) : (I(), Q(u, { key: 1 }))
      ])
    ]),
    _: 1
  });
}
const sl = /* @__PURE__ */ Y(tl, [["render", ol]]);
const rl = S({
  name: "ASelect",
  components: {
    SelectorInput: Xn,
    Menu: sl,
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
    const t = we(), a = p(), l = p(!1), s = j({
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
      i && (s.inputValue = i.text, s.localValue = i.text);
    }, f = (i) => {
      l.value = i;
    };
    x(
      () => e.modelValue,
      () => {
        u();
      }
    );
    const d = (i) => {
      s.inputValue = i.text, s.localValue = i.text, n("update:modelValue", i.value), n("setItemValue", i);
    };
    x(
      () => s.inputValue,
      (i) => {
        i === "" && s.localValue !== "" && setTimeout(() => {
          s.searchValue = "";
        });
      }
    );
    const c = (i) => {
      s.searchValue = i;
    }, h = (i) => {
      i || (l.value = !1);
    };
    return M("shrinkSelectMenuFn", f), M("updateInputValue", (i) => {
      s.inputValue = i;
    }), M("updateLocalValue", async (i) => {
      s.inputValue = s.localValue;
    }), {
      key: t,
      selectRef: a,
      setItemValue: d,
      searchOptions: c,
      resetValue: r,
      popoverVisible: l,
      isClickElementInPopover: h,
      ..._e(s)
    };
  }
}), il = ["id"];
function ul(e, n, t, a, l, s) {
  const r = q("SelectorInput"), u = q("Menu"), f = q("Popover");
  return I(), R("div", {
    class: "a-selector",
    id: e.key,
    ref: "selectRef"
  }, [
    o(f, {
      visible: e.popoverVisible,
      padding: "0",
      trigger: "click",
      width: Number(e.width) + 25 + "px",
      onIsClickElementInPopover: e.isClickElementInPopover
    }, {
      reference: U(() => [
        o(r, {
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
        o(u, {
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
  ], 8, il);
}
const cl = /* @__PURE__ */ Y(rl, [["render", ul]]), dl = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), $t = dl(cl);
const fl = /* @__PURE__ */ S({
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
    const a = p(e.defaultActive), l = p(!0), s = (u) => {
      u !== a.value && (a.value = u);
    }, r = E(() => ({
      backgroundColor: e.dark ? "#001428" : "var(--a-bg-color)",
      overflow: (l.value, "overlay")
    }));
    return M("default-active", a), M("dark", e.dark), M("updateDefaultValue", s), () => o("nav", {
      class: "a-menu-content",
      style: r.value
    }, [o("div", {
      class: "a-menu-item-list"
    }, [t.default()])]);
  }
}), hl = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), ml = hl(fl);
const vl = /* @__PURE__ */ S({
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
    const a = B("default-active"), l = B("dark"), s = B("updateDefaultValue"), r = E(() => a.value === e.index), u = p(null), f = p(!1);
    K(() => {
      ue(() => {
        d();
      });
    }), x(() => a.value, (v) => {
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
    return () => o("div", {
      ref: u,
      class: `a-menu-item ${i()} ${h()}`,
      onClick: () => s(e.index)
    }, [o("div", {
      class: "item-icon"
    }, [t.icon && t.icon()]), o("div", {
      class: "item-title"
    }, [t.default && t.default()])]);
  }
}), pl = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), gl = pl(vl);
const yl = /* @__PURE__ */ S({
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
    const a = De(), l = B("dark"), s = B("default-active"), r = p(null), u = p(null), f = p(null), d = p(null), c = p(0), h = p(!1);
    K(() => {
      c.value = u.value.offsetHeight, u.value.style.height = "0px", i(), $();
    }), x(() => s.value, () => {
      m() ? f.value.style.color = l ? "#FFFFFF" : "var(--a-primary-color)" : f.value.style.color = "";
    });
    const i = () => {
      var b;
      const g = r.value.parentElement, k = g.getAttribute("slot");
      if (k && k === "sub") {
        const V = (b = g == null ? void 0 : g.parentElement) == null ? void 0 : b.querySelector(".a-sub-item");
        f.value.style.paddingLeft = Ce(V, "padding-left") + 22 + "px";
      }
    }, v = () => {
      const g = r.value.parentElement;
      g.style.transition = "height 0.25s ease", u.value.style.height === "0px" ? (u.value.style.height = c.value + "px", g.style.height = g.offsetHeight + c.value + "px", h.value = !0) : (c.value = u.value.scrollHeight, u.value.style.height = "0px", g.style.height = g.offsetHeight - c.value + "px", h.value = !1);
    }, m = () => {
      const g = [];
      return y(g, a.slots.default), g.includes(s.value);
    }, y = (g, k) => {
      k && k().forEach((b) => {
        b.children.default && y(g, b.children.default), b.props && g.push(b.props.index);
      });
    }, $ = () => {
      m() && (f.value.style.color = l ? "#FFFFFF" : "var(--a-primary-color)", h.value = !0, u.value.style.height = c.value + "px"), ue(() => {
        d.value.style.transition = "transform 0.2s ease", f.value.style.transition = "color 0.2s ease";
      });
    }, w = () => l ? "a-sub-item-dark" : "a-sub-item-light";
    return () => o("div", {
      class: "a-sub-menu-content",
      ref: r
    }, [o("div", {
      ref: f,
      class: `a-sub-item ${w()}`,
      onClick: () => v()
    }, [o("div", {
      class: "item-icon"
    }, [t.icon && t.icon()]), o("div", {
      class: "item-title"
    }, [t.title && t.title()]), o("div", {
      ref: d,
      class: `item-right-icon iconfont icon-right ${h.value ? "open" : "close"}`
    }, null)]), o("div", {
      ref: u,
      class: "a-sub-slot",
      slot: "sub"
    }, [t.default && t.default()])]);
  }
}), bl = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), wl = bl(yl);
const Ct = /* @__PURE__ */ S({
  name: "ATransition",
  setup(e, {
    slots: n
  }) {
    return () => o(pe, {
      name: "a-transition-fade"
    }, {
      default: () => [n.default && n.default()]
    });
  }
});
const kl = /* @__PURE__ */ S({
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
    const {
      ZIndex: a,
      setZIndex: l
    } = Oe(), s = p(a);
    l(s.value);
    const r = ["top", "bottom", "left", "right"], u = E(() => typeof e.size == "number" ? e.size + "px" : e.size), f = p(e.modelValue ? "0" : `-${u.value}`), d = E(() => r.find((w) => w === e.direction) || "right"), c = E(() => e.direction === "left" || e.direction === "right" ? "width" : "height");
    x(() => e.modelValue, (w) => {
      const g = f.value;
      w ? (document.body.style.overflow = "hidden", setTimeout(() => {
        f.value = "0", n("opened");
      }, 50)) : (f.value = g, n("closed"), document.body.style.removeProperty("overflow"));
    });
    const h = () => {
      f.value = "-" + u.value, setTimeout(() => {
        n("update:modelValue", !e.modelValue);
      }, 180);
    }, i = () => {
      if (typeof e.beforeClose == "function") {
        e.beforeClose(h);
        return;
      } else
        h();
    }, v = () => {
      e.closeOnClickModal && i();
    }, m = () => t.header ? t.header() : o("span", null, [e.title]), y = () => o("div", {
      class: "a-drawer-header"
    }, [o("div", {
      class: "a-drawer-header-content"
    }, [o("div", {
      class: "header-slot"
    }, [m()]), o("span", {
      onClick: () => i(),
      class: "iconfont icon-close"
    }, null)])]), $ = E(() => {
      const w = c.value === "height" ? "width" : "height";
      return {
        [c.value]: u.value,
        [d.value]: f.value,
        [`min-${w}`]: `100v${c.value === "height" ? "w" : "h"}`
      };
    });
    return () => o(Le, {
      to: "body"
    }, {
      default: () => [o(Ct, null, {
        default: () => [e.modelValue && o("div", {
          class: "a-drawer-mantle",
          style: {
            zIndex: s.value
          },
          onClick: () => v()
        }, [o("div", {
          onClick: (w) => w.stopPropagation(),
          class: "a-drawer-content",
          style: $.value
        }, [y(), o("div", {
          class: "a-drawer-body"
        }, [t.default && t.default()]), t.footer && o("div", {
          class: "a-drawer-footer"
        }, [t.footer()])])])]
      })]
    });
  }
}), Sl = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), $l = Sl(kl);
const Cl = S({
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
    }), x(
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
}), Il = { class: "a-checked-main" }, Vl = ["indeterminate", "id", "checked", "disabled"], xl = ["for"];
function Al(e, n, t, a, l, s) {
  return I(), R("div", Il, [
    D("input", {
      indeterminate: e.indeterminate,
      onChange: n[0] || (n[0] = (...r) => e.changeChecked && e.changeChecked(...r)),
      class: J(e.disabled && e.checked ? "checked" : ""),
      id: e.valueSlot,
      type: "checkbox",
      checked: e.checked,
      disabled: e.disabled
    }, null, 42, Vl),
    D("label", { for: e.valueSlot }, [
      D("span", {
        onClick: n[1] || (n[1] = (...r) => e.handleLabelClick && e.handleLabelClick(...r)),
        style: { "margin-left": "3px" }
      }, ee(e.valueSlot), 1)
    ], 8, xl)
  ]);
}
const _l = /* @__PURE__ */ Y(Cl, [["render", Al]]), Dl = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), je = Dl(_l);
const El = S({
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
        let s = [...e.modelValue];
        s.indexOf(l.value) === -1 ? s.push(l.value) : s = s.filter((r) => r !== l.value), n("update:modelValue", s), n("change", l);
      },
      updateCheckedGroup: (l) => {
        n("update:modelValue", l);
      }
    };
  }
}), Bl = { class: "a-checkbox-group" };
function Ml(e, n, t, a, l, s) {
  const r = q("ACheckbox");
  return I(), R("div", Bl, [
    (I(!0), R(se, null, Ae(e.options, (u, f) => (I(), Q(r, {
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
const Tl = /* @__PURE__ */ Y(El, [["render", Ml]]), Rl = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), Ll = Rl(Tl);
const Pl = S({
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
}), Ol = { class: "switch-content" }, Nl = ["id", "checked", "disabled"], Fl = ["openTitle", "offTitle", "for"];
function Hl(e, n, t, a, l, s) {
  return I(), R("div", Ol, [
    D("input", {
      type: "checkbox",
      onClick: n[0] || (n[0] = (...r) => e.switchChange && e.switchChange(...r)),
      id: e.uuid,
      checked: e.modelValue,
      disabled: e.disabled,
      hidden: ""
    }, null, 8, Nl),
    D("label", {
      style: oe(`cursor: ${e.disabled ? "not-allowed" : "pointer"};opacity:${e.disabled && e.modelValue ? "0.5" : "1"}`),
      openTitle: e.openTitle,
      offTitle: e.offTitle,
      for: e.uuid
    }, null, 12, Fl)
  ]);
}
const zl = /* @__PURE__ */ Y(Pl, [["render", Hl]]), Yl = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), Wl = Yl(zl);
const Kl = S({
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
function jl(e, n, t, a, l, s) {
  return e.Closeable ? he("", !0) : (I(), R("div", {
    key: 0,
    style: oe(`padding-right:${e.closeable ? "20px" : "9px"};`),
    class: J(`tag ${e.getTagType(e.type)}`)
  }, [
    Pe(e.$slots, "default"),
    e.closeable ? (I(), R("div", {
      key: 0,
      class: J(`close-content ${e.mouseEnter && `close-${e.type}`}`),
      onMouseleave: n[1] || (n[1] = (r) => e.mouseEnter = !1),
      onMouseenter: n[2] || (n[2] = (r) => e.mouseEnter = !0)
    }, [
      e.closeable ? (I(), R("span", {
        key: 0,
        class: "iconfont icon-close",
        onClick: n[0] || (n[0] = ht((...r) => e.closeTag && e.closeTag(...r), ["stop"]))
      })) : he("", !0)
    ], 34)) : he("", !0)
  ], 6));
}
const Ul = /* @__PURE__ */ Y(Kl, [["render", jl]]), Gl = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), ql = Gl(Ul);
const Xl = /* @__PURE__ */ S({
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
    const a = new Array(6).fill(NaN), l = E(() => e.global && (!t.default || typeof t.default != "function")), s = E(() => !l.value && e.modelValue), r = p(null), u = p(!1);
    x(() => e.modelValue, (h) => {
      f(h);
    });
    const f = (h) => {
      h ? (r.value.style.opacity = "1", l.value && (document.body.style.overflow = "hidden")) : (l.value && (r.value.style.opacity = "0"), document.body.style.removeProperty("overflow")), setTimeout(() => {
        u.value = h;
      }, h ? 0 : 500);
    }, d = E(() => ({
      position: l.value ? "relative" : "absolute",
      left: l.value ? "0" : "40%",
      zIndex: l.value ? 9999 : 101
    })), c = () => z(o("div", {
      class: "a-loading-content",
      style: d.value
    }, [o("div", {
      class: "a-chase"
    }, [a.map(() => o("div", {
      class: "a-chase-dot"
    }, null))]), o("div", {
      class: "a-title"
    }, [e.title])]), [[W, e.modelValue]]);
    return () => o(Ct, null, {
      default: () => [z(o("div", {
        ref: r,
        class: `a-loading ${l.value && "a-global"}`,
        style: {
          position: l.value ? "fixed" : "relative"
        }
      }, [c(), o("div", {
        class: "a-loading-slot"
      }, [t.default && t.default()]), s.value && o("div", {
        class: "a-loading-mask"
      }, null)]), [[W, l.value ? !!e.modelValue : !!(t.default && typeof t.default == "function")]])]
    });
  }
}), Zl = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), Ql = Zl(Xl);
const It = /* @__PURE__ */ S({
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
    x(() => e.modelValue, (u) => {
      t.numberValue = u;
    });
    const a = E(() => ({
      pointerEvents: "none",
      cursor: "not-allowed",
      color: "#e4e5e6"
    })), l = () => o(se, null, [o("div", {
      style: e.disabled ? a.value : "",
      onClick: () => s("add"),
      class: "add-button"
    }, [o("span", {
      class: "iconfont icon-jia"
    }, null)]), o("div", {
      style: e.disabled ? a.value : "",
      onClick: () => s("subtract"),
      class: "subtract-button"
    }, [o("span", {
      class: "iconfont icon-jian"
    }, null)])]);
    x(() => t.numberValue, (u) => {
      Number(u) >= e.max && e.max !== 1 / 0 ? t.numberValue = e.max : Number(u) <= e.min && e.min !== -1 / 0 && (t.numberValue = e.min), n("update:modelValue", t.numberValue);
    });
    const s = (u) => {
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
    return () => o("div", {
      class: "a-input-number-content"
    }, [l(), o(Ee, {
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
}, e), ea = Jl(It);
const ta = { open: "caret-down", close: "caret-right" }, na = S({
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
    const t = B("uniKey"), a = we(), l = B("node-key"), s = j(e.data), r = B("tree-data"), u = j({
      carets: ta,
      tapScopes: {},
      scopes: {},
      height: 0
    });
    ve(() => {
    }), K(() => {
    });
    const f = (m, y, $) => {
      d(m, y), T.$emit("checked" + t, m, $);
    }, d = (m, y) => {
      m.checked = y, m.checked ? m.children && m.children.length > 0 && m.children.forEach(($) => {
        d($, !0);
      }) : m.children && m.children.length > 0 && m.children.forEach(($) => {
        d($, !1);
      }), c(r, m, m.checked);
    }, c = (m, y, $) => {
      m.forEach((w) => {
        if (w.key === y.pid) {
          let g = !1;
          w.children && (g = w.children.some(
            (k) => k.checked === !1
          )), g ? (w.checked = !1, w.children.some(
            (k) => k.checked === !0 || k.indeterminate === !0
          ) ? w.indeterminate = !0 : w.indeterminate = !1) : (w.checked = $, w.indeterminate = !1), c(r, w, w.checked);
        }
        w.children && c(w.children, y, $);
      });
    };
    return {
      treeData: s,
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
        const $ = m.target;
        ["LABEL", "INPUT"].includes($.nodeName) || (T.$emit("change" + t, e.data[y]), u.tapScopes[y] = u.tapScopes[y] && u.tapScopes[y] === "open" ? "close" : "open", u.scopes[y] = !u.scopes[y]);
      },
      uid: a,
      updateDefaultValue: d,
      checkedTreeItem: f
    };
  }
}), la = { class: "a-tree-menu" }, aa = ["node-key"], oa = ["onClick"], sa = ["onClick"], ra = ["onClick"];
function ia(e, n, t, a, l, s) {
  const r = q("ACheckBox"), u = q("a-tree-item");
  return I(), R("div", la, [
    (I(!0), R(se, null, Ae(e.treeData, (f, d) => (I(), R("div", {
      class: J(`a-tree-list tree-ref-${e.uid}`),
      ref_for: !0,
      ref: "treeRef",
      "node-key": f[e.nodeKey],
      key: f[e.props.key]
    }, [
      D("div", {
        class: J(["a-tree-item", ["treeNode", { "treeNode--select": f.onSelect }]]),
        onClick: (c) => e.changeStatus(c, d)
      }, [
        z(D("i", {
          class: J([
            "iconfont icon-tree-retract",
            e.state.carets[e.state.tapScopes[d]]
          ])
        }, null, 2), [
          [W, f[e.props.children]]
        ]),
        e.isSelect ? (I(), Q(r, {
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
            D("span", {
              onClick: (c) => e.tap(f, d),
              class: "title"
            }, ee(f[e.props.label]), 9, sa)
          ]),
          _: 2
        }, 1032, ["default-value", "indeterminate", "onUpdateDefaultValue", "onLabelClick"])) : (I(), R("span", {
          key: 1,
          onClick: (c) => e.tap(f, d)
        }, ee(f[e.props.label]), 9, ra))
      ], 10, oa),
      D("div", {
        class: "a-tree-item-content",
        style: oe({ gridTemplateRows: e.state.scopes[d] ? "1fr" : "0fr" })
      }, [
        o(u, {
          isSelect: e.isSelect,
          data: f[e.props.children]
        }, null, 8, ["isSelect", "data"])
      ], 4)
    ], 10, aa))), 128))
  ]);
}
const ua = /* @__PURE__ */ Y(na, [["render", ia]]);
const ca = S({
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
    TreeItem: ua
  },
  emits: [
    "update:defaultCheckedKeys",
    "operation",
    "node-click",
    "change",
    "checked"
  ],
  setup(e, { emit: n }) {
    const t = we(), a = j(He(e.data)), l = e.data[0].key, s = (d, c, h) => {
      d.forEach((i) => {
        if (i.key === c.pid) {
          let v = !1;
          i.children && (v = i.children.some((m) => m.checked === !1)), v ? (i.checked = !1, i.children.some((m) => m.checked === !0 || m.indeterminate === !0) ? i.indeterminate = !0 : i.indeterminate = !1) : (i.checked = h, i.indeterminate = !1), s(a, i, i.checked);
        }
        i.children && s(i.children, c, h);
      });
    }, r = (d, c = !1, h = null) => {
      for (let i = 0; i < d.length; i++) {
        let v = c;
        const m = d[i];
        m.checked = !1, m.pid = h, m.expand = e.expand, m.indeterminate = !1, v ? m.checked = !0 : e.defaultCheckedKeys.includes(m.key) ? (m.checked = !0, v = !0) : m.children && m.children.some(($) => e.defaultCheckedKeys.includes($.key)) && (m.checked = !1), m.children && r(m.children, v, m.key), s(a, m, m.checked);
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
function da(e, n, t, a, l, s) {
  const r = q("TreeItem");
  return I(), Q(r, {
    data: e.treeData,
    isSelect: e.isSelect,
    props: e.props,
    expand: e.expand,
    onCheckedItem: e.checkedItem
  }, null, 8, ["data", "isSelect", "props", "expand", "onCheckedItem"]);
}
const fa = /* @__PURE__ */ Y(ca, [["render", da]]), ha = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), ma = ha(fa);
const va = S({
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
    const t = B("modelValue"), a = De(), l = p(""), s = p(!1);
    return ve(() => {
      s.value = t === e.value, l.value = a.slots.default()[0].children;
    }), x(
      () => e.modelValue,
      () => {
        s.value = e.modelValue === e.value;
      },
      { deep: !0 }
    ), {
      isChecked: s,
      valueSlot: l,
      changeChecked: () => {
        n("updateRadioValue", e.value);
      }
    };
  }
}), pa = { class: "radio-main" }, ga = ["id", "checked", "value", "disabled"], ya = ["for"], ba = { style: { "margin-left": "3px" } };
function wa(e, n, t, a, l, s) {
  return I(), R("div", pa, [
    D("input", {
      class: J(e.disabled && e.isChecked ? "checked" : ""),
      type: "radio",
      onClick: n[0] || (n[0] = (...r) => e.changeChecked && e.changeChecked(...r)),
      id: e.valueSlot,
      name: "radio",
      checked: e.isChecked,
      value: e.value,
      disabled: e.disabled
    }, null, 10, ga),
    D("label", { for: e.valueSlot }, [
      D("span", ba, ee(e.valueSlot && e.valueSlot), 1)
    ], 8, ya)
  ]);
}
const ka = /* @__PURE__ */ Y(va, [["render", wa]]), Sa = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), Vt = Sa(ka);
const $a = S({
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
    ARadio: Vt
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
}), Ca = { class: "a-radio-group" };
function Ia(e, n, t, a, l, s) {
  const r = q("ARadio");
  return I(), R("div", Ca, [
    (I(!0), R(se, null, Ae(e.options, (u, f) => (I(), Q(r, {
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
const Va = /* @__PURE__ */ Y($a, [["render", Ia]]), xa = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), Aa = xa(Va);
const _a = /* @__PURE__ */ S({
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
    x([() => e.columns, () => e.data], ([f, d]) => {
      a.columns = f, a.data = d;
    });
    const l = E(() => a.data.length === 0);
    K(() => {
    });
    const s = () => o("thead", {
      class: "a-table-thead"
    }, [o("tr", {
      class: "a-table-tr"
    }, [a.columns.map(({
      key: f,
      title: d,
      width: c
    }, h) => o("th", {
      class: ["a-table-th", e.singleLine ? "" : "single-line"],
      key: f,
      style: {
        width: c ? c + "px" : "auto"
      }
    }, [o("div", {
      class: "a-table-th_title-wrapper"
    }, [o("div", {
      class: "a-table-th__title"
    }, [d])])]))])]), r = () => {
      const f = ["a-table-td", e.singleLine ? "" : "single-line"], d = (c) => ({
        width: c ? c + "px" : "auto",
        "--a-table-tr-bottom": e.bordered ? "none" : "1px solid var(--a-border-weak-color)"
      });
      return o("tbody", {
        class: "a-table-tbody"
      }, [a.data.map((c) => o("tr", {
        class: "a-table-tr"
      }, [a.columns.map(({
        key: h,
        render: i,
        width: v
      }) => o("td", {
        "data-col-key": h,
        class: f,
        style: d(v)
      }, [i ? i(c) : c[h]]))]))]);
    }, u = () => o("div", {
      class: "a-table-empty_wrapper"
    }, [o(G, {
      name: "data-view",
      style: {
        fontSize: "50px",
        color: "var(--a-text-disable-color)"
      }
    }, null), o("div", {
      class: "text"
    }, [ae("无数据")])]);
    return () => o("div", {
      class: "a-table",
      style: {
        border: e.bordered ? "1px solid var(--a-border-weak-color)" : "none"
      }
    }, [o("table", {
      class: "table"
    }, [s()]), l.value ? u() : o(Re, {
      style: {
        maxHeight: e.maxHeight
      }
    }, {
      default: () => [o("div", {
        class: "a-table--body-wrapper",
        ref: t
      }, [o("table", {
        class: "table"
      }, [r()])])]
    })]);
  }
}), Da = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), Ea = Da(_a);
const Ba = S({
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
}), Ma = ["onClick"], Ta = /* @__PURE__ */ D("a", {
  href: "javascript:;",
  class: "dot-link"
}, null, -1), Ra = [
  Ta
];
function La(e, n, t, a, l, s) {
  return e.hasDot ? (I(), R("div", {
    key: 0,
    class: J(`dot-wrapper-${e.dotPositon}`)
  }, [
    (I(!0), R(se, null, Ae(e.dotLength, (r) => (I(), R("div", {
      class: "dot-item",
      key: r,
      onClick: (u) => e.dotClick(r - 1),
      style: oe({
        backgroundColor: r - 1 === e.currentIndex ? "#fff" : e.dotBgColor
      })
    }, Ra, 12, Ma))), 128))
  ], 2)) : he("", !0);
}
const Pa = /* @__PURE__ */ Y(Ba, [["render", La]]);
const Oa = S({
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
    return K(() => {
    }), {
      clickDirector: a,
      directorRef: t
    };
  }
}), Na = {
  ref: "directorRef",
  class: "director"
}, Fa = /* @__PURE__ */ D("span", { class: "iconfont icon-left" }, null, -1), Ha = [
  Fa
], za = /* @__PURE__ */ D("span", { class: "iconfont icon-right" }, null, -1), Ya = [
  za
];
function Wa(e, n, t, a, l, s) {
  return I(), Q(pe, { name: "fade" }, {
    default: U(() => [
      z(D("div", Na, [
        D("div", {
          onClick: n[0] || (n[0] = (r) => e.clickDirector("pre")),
          class: "directorContent director-left"
        }, Ha),
        D("div", {
          onClick: n[1] || (n[1] = (r) => e.clickDirector("next")),
          class: "directorContent director-right"
        }, Ya)
      ], 512), [
        [W, e.showDirector]
      ])
    ]),
    _: 1
  });
}
const Ka = /* @__PURE__ */ Y(Oa, [["render", Wa]]);
const ja = S({
  name: "ARotation",
  components: {
    Dot: Pa,
    Director: Ka
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
    const a = De(), l = p(null), s = j({
      currentIndex: e.initial - 1,
      picLength: 0,
      contentHeight: 0,
      contentWidth: 0,
      showDirector: !1
    });
    M("currentIndex", Mt(s, "currentIndex")), K(() => {
      ue(() => {
        r();
        const i = a.slots.default()[0].children;
        s.picLength = i.length, u();
      });
    }), xe(() => {
      clearInterval(t), t = null;
    });
    const r = () => {
      const i = l.value.children[0] || 250;
      s.contentHeight = Ce(i, "height"), s.contentWidth = Ce(i, "width");
    }, u = () => {
      clearInterval(t), e.autoplay && (t = setInterval(() => {
        f("next");
      }, e.duration));
    }, f = (i) => {
      switch (i) {
        case "next":
          s.currentIndex += 1, s.currentIndex === s.picLength && (s.currentIndex = 0);
          break;
        case "pre":
          s.currentIndex -= 1, s.currentIndex === -1 && (s.currentIndex = s.picLength - 1);
          break;
      }
    };
    return {
      showDirectorFn: (i) => {
        i ? clearInterval(t) : u(), s.showDirector = i;
      },
      slotContent: l,
      dotClick: (i) => {
        s.currentIndex = i, u();
      },
      clickDirector: (i) => {
        f(i), u();
      },
      ..._e(s)
    };
  }
}), Ua = { class: "rotation" }, Ga = { ref: "slotContent" };
function qa(e, n, t, a, l, s) {
  const r = q("Dot"), u = q("Director");
  return I(), R("div", Ua, [
    D("div", {
      class: "inner",
      style: oe(`height:${e.contentHeight + "px"};width:${e.contentWidth + "px"}`),
      onMouseenter: n[0] || (n[0] = (f) => e.showDirectorFn(!0)),
      onMouseleave: n[1] || (n[1] = (f) => e.showDirectorFn(!1))
    }, [
      D("div", Ga, [
        Pe(e.$slots, "default")
      ], 512),
      o(r, {
        hasDot: e.hasDot,
        currentIndex: e.currentIndex,
        dotLength: e.picLength,
        dotBgColor: e.dotBgColor,
        dotPositon: e.dotPositon,
        onDotClick: e.dotClick
      }, null, 8, ["hasDot", "currentIndex", "dotLength", "dotBgColor", "dotPositon", "onDotClick"]),
      o(u, {
        showDirector: e.hasDirector && e.showDirector,
        onClickDirector: e.clickDirector
      }, null, 8, ["showDirector", "onClickDirector"])
    ], 36)
  ]);
}
const Xa = /* @__PURE__ */ Y(ja, [["render", qa]]), Za = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), Qa = Za(Xa);
const Ja = S({
  name: "ARotationItem",
  setup() {
    const e = B("currentIndex", p(0)), n = De(), t = j({
      selfIndex: n == null ? void 0 : n.vnode.key,
      currentIndex: e
    });
    return x(e, (a) => {
      t.currentIndex = a;
    }), {
      ..._e(t)
    };
  }
}), eo = { class: "rotation-item" };
function to(e, n, t, a, l, s) {
  return I(), Q(pe, null, {
    default: U(() => [
      z(D("div", eo, [
        Pe(e.$slots, "default")
      ], 512), [
        [W, e.selfIndex === e.currentIndex]
      ])
    ]),
    _: 3
  });
}
const no = /* @__PURE__ */ Y(Ja, [["render", to]]), lo = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), ao = lo(no);
const oo = /* @__PURE__ */ S({
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
    const a = p(e.currentPage), l = p([]), s = p(e.pageSize), r = E(() => Math.ceil(Number(e.total) / Number(s.value))), u = p(2), f = E(() => {
      let g = [];
      return e.sizesList.forEach((k) => {
        g.push({
          value: k,
          text: k + " 条/页"
        });
      }), g;
    }), d = (g, k, b) => {
      let V = [], N = b * 2 + 1 + 2 + 2 + 2, H = N - 4, _ = 1 + 2 + b + 1, F = g - 2 - b - 1;
      const C = {
        omit: !0,
        value: "...",
        type: "prev"
      }, A = {
        omit: !0,
        value: "...",
        type: "next"
      };
      return g <= N - 2 ? V = Array.from({
        length: g
      }, (L, P) => P + 1) : k < _ ? V = [...Array.from({
        length: H
      }, (L, P) => P + 1), A, g] : k > F ? V = [1, C, ...Array.from({
        length: H
      }, (L, P) => g - H + P + 1)] : V = [1, C, ...Array.from({
        length: b * 2 + 1
      }, (L, P) => k - b + P), A, g], V;
    }, c = () => {
      l.value = d(r.value, Number(a.value), u.value);
      const g = l.value[l.value.length - 1];
      Number(a.value) < 1 ? a.value = 1 : Number(a.value) > g && (a.value = g);
    };
    c(), x(() => e.currentPage, (g) => {
      a.value = g, c();
    }), x(() => a.value, () => {
      c();
    }), x(() => e.pageSize, (g) => s.value = g), x(() => s.value, (g) => n("size-change", g)), x(() => r.value, () => c());
    const h = E(() => (g) => {
      let k = "btn pagination-item";
      return e.background && (k += " background"), Number(a.value) === g && (k += ` ${e.background ? "background-current" : "current"}`), k;
    }), i = (g) => {
      if (typeof g == "number")
        g !== a.value && (a.value = g, n("page-change", g));
      else if (typeof g == "object") {
        const k = u.value * 2 + 1;
        g.type === "prev" ? n("page-change", Number(a.value) - k) : n("page-change", Number(a.value) + k);
      }
    }, v = (g) => {
      let k = a.value;
      if (g === "prev") {
        if (k === 1)
          return;
        n("page-change", Number(k) - 1);
      } else {
        if (k === l.value[l.value.length - 1])
          return;
        n("page-change", Number(k) + 1);
      }
    }, m = E(() => (g) => {
      let k = "";
      return g === "prev" ? a.value === 1 && (k = "disable") : a.value === l.value[l.value.length - 1] && (k = "disable"), k;
    }), y = (g) => typeof g == "number" ? g : o("span", {
      class: "iconfont icon-shenglvehao"
    }, null), $ = (g, k, b) => {
      const V = b;
      if (V.omit) {
        const N = g.target.firstChild;
        k === "enter" ? V.type === "prev" ? N.className = "iconfont icon-doubleleft" : N.className = "iconfont icon-doubleright-copy" : N.className = "iconfont icon-shenglvehao";
      }
    }, w = async (g) => {
      let k = a.value;
      if (g === "" || Number.isNaN(Number(g))) {
        let V = a.value;
        a.value = "", await ue(), a.value = V;
        return;
      }
      const b = l.value[l.value.length - 1];
      Number(g) < 1 ? k = 1 : Number(g) > b ? k = b : k = g, Number(g) > b && (a.value = "", await ue(), a.value = k), n("page-change", Number(k));
    };
    return () => o("div", {
      class: "a-pagination-content"
    }, [e.showTotal && o("div", {
      class: "a-pagination-total"
    }, [ae("Total "), e.total]), o("div", {
      class: `btn ${e.background ? "background" : ""} prev ${m.value("prev")}`,
      onClick: () => v("prev")
    }, [o("span", {
      class: "iconfont icon-left"
    }, null)]), o("div", {
      class: "pagination-list"
    }, [l.value.map((g, k) => o("div", {
      onMouseleave: (b) => $(b, "leave", g),
      onMouseenter: (b) => $(b, "enter", g),
      onClick: () => i(g),
      key: k,
      class: h.value(g)
    }, [y(g)]))]), o("div", {
      class: `btn ${e.background ? "background" : ""} next ${m.value("next")}`,
      onClick: () => v("next")
    }, [o("span", {
      class: "iconfont icon-right"
    }, null)]), z(o("div", {
      class: "page-size-select"
    }, [o($t, {
      width: "80",
      modelValue: s.value,
      "onUpdate:modelValue": (g) => s.value = g,
      options: f.value
    }, null)]), [[W, e.showSizeChanger || Number(e.total) > 50]]), z(o("div", {
      class: "a-pagination-goto"
    }, [o("span", null, [ae("跳至")]), o(Ee, {
      width: "35",
      placeholder: "",
      value: a.value,
      textCenter: !0,
      onEnter: (g) => w(g)
    }, null)]), [[W, e.showQuickJumper]])]);
  }
}), so = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), ro = so(oo);
const io = S({
  setup() {
    const e = p(!1), n = p(), t = p("#303133"), a = p("bottom");
    function l() {
      e.value = !0;
    }
    function s() {
      e.value = !1;
    }
    const r = p({
      left: 0,
      top: 0
    }), u = E(() => ({
      left: r.value.left + "px",
      top: r.value.top + "px"
    }));
    return {
      tooltipShow: e,
      showTip: l,
      hiddenTip: s,
      tooltipPostiton: r,
      tooltipStyle: u,
      text: n,
      placements: a,
      bgColor: t
    };
  }
}), uo = ["innerHTML"];
function co(e, n, t, a, l, s) {
  return I(), Q(pe, { name: "tooltip" }, {
    default: U(() => [
      z(D("div", {
        class: "a-tooltip",
        style: oe([e.tooltipStyle, { backgroundColor: e.bgColor }])
      }, [
        D("span", {
          class: "a-tooltip-text",
          innerHTML: e.text
        }, null, 8, uo),
        D("div", {
          class: J(["a-tooltip-arrow", [
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
        [W, e.tooltipShow]
      ])
    ]),
    _: 1
  });
}
const fo = /* @__PURE__ */ Y(io, [["render", co]]);
function ho(e) {
  e._tipHandler && e.removeEventListener("mouseenter", e._tipHandler), e._tipMouseleaveHandler && e.removeEventListener("mouseleave", e._tipMouseleaveHandler), delete e._tipHandler, delete e._tipMouseleaveHandler, delete e._tipOptions, delete e._tipInstance;
}
function ot(e, n, t) {
  let a = t;
  if (!e || !n)
    return;
  e.tooltipPostiton.left = 0, e.tooltipPostiton.top = 0;
  let l, s, r, u = e.$el.nodeType === 3 ? e.$el.nextElementSibling : e.$el;
  l = u.getBoundingClientRect(), s = n.getBoundingClientRect(), r = u.querySelector(".a-tooltip-arrow ");
  let f, d;
  switch (a) {
    case "top":
      s.top < l.height && (a = "bottom");
      break;
    case "bottom":
      s.bottom < l.height && (a = "top");
      break;
    case "left":
      s.left < l.width && (a = "right");
      break;
    case "right":
      s.right < l.width && (a = "left");
      break;
    default:
      throw new Error("Invalid direction");
  }
  switch (r.className = `a-tooltip-arrow ${a}`, a) {
    case "top":
      f = s.top - u.offsetHeight - 10, d = s.left + (s.width - u.offsetWidth) / 2;
      break;
    case "bottom":
      f = s.bottom + 10, d = s.left + (s.width - u.offsetWidth) / 2;
      break;
    case "left":
      f = s.top + (s.height - u.offsetHeight) / 2, d = s.left - u.offsetWidth - 10;
      break;
    case "right":
      f = s.top + (s.height - u.offsetHeight) / 2, d = s.right + 10;
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
    ho(e);
    let t = null;
    e._tipOptions = n.value, e._tipHandler = () => {
      t !== null && (clearTimeout(t), t = null);
      const a = st.filter((s) => n.modifiers[s]), l = a.length ? a : st;
      e._tipInstance || (e._synopsis = Ye(fo), e._root = document.createElement("div"), document.body.appendChild(e._root), e._tipInstance = e._synopsis.mount(e._root)), e._tipInstance.placements = l[0], e._tipInstance.showTip(), typeof e._tipOptions == "object" ? (e._tipInstance.text = e._tipOptions.text, e._tipInstance.bgColor = e._tipOptions.bgColor || "#303133") : e._tipInstance.text = e._tipOptions, ue(() => {
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
const mo = /* @__PURE__ */ S({
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
    }), () => o("div", {
      class: "a-breadcrumb-content"
    }, [t.default && t.default()]);
  }
}), vo = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), po = vo(mo);
const go = /* @__PURE__ */ S({
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
    const a = B("flag", "/");
    B("isRouter", !1);
    const l = B("pathClick", () => {
    }), s = () => t.default ? t.default() : "", r = () => {
      l(e.path);
    };
    return () => o("div", {
      class: "a-breadcrumb-item"
    }, [o("span", {
      class: "title-href",
      onClick: () => r()
    }, [s()]), o("span", {
      class: "flag"
    }, [a])]);
  }
}), yo = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), bo = yo(go);
const wo = /* @__PURE__ */ S({
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
    const a = p(), l = p(), s = p(), r = p(), u = p(0), f = p(!1), d = p(0), c = p(0), h = E(() => Math.round(c.value / d.value * 100)), i = E(() => d.value * (e.step / 100)), v = p(h.value);
    x(h, (b) => {
      b !== e.modelValue && (t("update:modelValue", b), t("change", b));
    }), x(() => e.modelValue, () => {
      m();
    }), x(() => v.value, (b) => {
      b !== e.modelValue && (t("update:modelValue", b), t("change", b), m());
    }), K(() => {
      ue(() => {
        m();
      });
    });
    const m = () => {
      d.value = a.value.offsetWidth, c.value = e.modelValue / 100 * d.value, s.value.style.left = c.value + "px", l.value.style.width = c.value + "px", v.value = h.value;
    }, y = (b) => {
      b.stopPropagation(), b.preventDefault(), u.value = b.clientX, document.addEventListener("mousemove", w), document.addEventListener("mouseup", k);
    }, $ = (b) => {
      u.value = b.clientX;
      const V = a.value.getBoundingClientRect().left, N = g(b.clientX - V, i.value);
      c.value = N, s.value.style.left = c.value + "px", l.value.style.width = c.value + "px";
    }, w = (b) => {
      b.preventDefault(), f.value = !0;
      let V = b.clientX < u.value ? "left" : "right";
      const N = a.value.getBoundingClientRect(), H = N.left, _ = N.width, F = b.clientX >= H && b.clientX - H <= _;
      if (f.value && (F || V === "left" && h.value > 0 || V === "right" && h.value < 100)) {
        const A = b.clientX - u.value, L = s.value.offsetLeft, P = L + A;
        if (Math.abs(P - L) >= _ * (e.step / 100)) {
          const te = Math.min(Math.max(P, 0), _);
          c.value = g(te, i.value), s.value.style.left = c.value + "px", l.value.style.width = c.value + "px", u.value = b.clientX;
        }
      }
    }, g = (b, V) => {
      const N = b % V;
      if (N === 0)
        return b;
      {
        const H = b - N, _ = H + V;
        return b - H <= _ - b ? H : _;
      }
    }, k = () => {
      f.value = !1, document.removeEventListener("mousemove", w), document.removeEventListener("mouseup", k);
    };
    return () => o("div", {
      class: "a-slider-content"
    }, [o("div", {
      class: "a-slider-runway",
      style: {
        marginRight: e.showInput ? "30px" : ""
      },
      ref: a,
      onMousedown: (b) => $(b)
    }, [o("div", {
      class: "a-slider-stop-list"
    }, [e.showStops && Array.from({
      length: g(d.value / i.value, 1)
    }).map((b, V) => o("div", {
      class: "stop-item",
      style: {
        left: i.value * V + 1 + "px"
      }
    }, null))]), o("div", {
      class: "a-slider-bar",
      ref: l
    }, null), z(o("div", {
      class: "a-slider-button_wrapper",
      ref: s,
      onMousedown: (b) => y(b)
    }, [o("div", {
      ref: r,
      class: "a-slider-button"
    }, null)]), [[Tt("tooltip"), h.value, void 0, {
      top: !0
    }]])]), e.showInput && o(It, {
      modelValue: v.value,
      "onUpdate:modelValue": (b) => v.value = b,
      width: 100,
      max: 100,
      min: 0,
      step: e.step
    }, null)]);
  }
}), ko = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), So = ko(wo);
const $o = /* @__PURE__ */ S({
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
      default: "#0468dc"
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
    const t = p(null), a = E(() => e.percentage <= 0 ? 0 : e.percentage >= 100 ? 100 : e.percentage), l = E(() => {
      var h;
      let d = 31.79;
      return (((h = t.value) == null ? void 0 : h.offsetWidth) || 0) * (a.value / 100) > d;
    }), s = E(() => {
      if (e.status) {
        if (e.status === "success")
          return "#18a058";
        if (e.status === "prompt")
          return "#d69800";
        if (e.status === "error")
          return "#e53935";
      } else
        return e.color;
    }), r = E(() => e.format ? e.format(e.percentage) : e.status && !e.textInside ? o(G, {
      name: e.status,
      style: {
        color: s.value,
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
    }, f = E(() => {
      let d = "";
      return Array.isArray(s.value) ? d = u(a.value, s.value) : d = s.value, {
        width: a.value + "%",
        backgroundColor: d
      };
    });
    return () => o("div", {
      class: "a-progress-content"
    }, [o("div", {
      class: "a-progress-runway",
      ref: t,
      style: {
        height: e.strokeWidth + "px"
      }
    }, [o("div", {
      class: "a-progress-bar",
      style: f.value
    }, [e.textInside && l.value && o("div", {
      class: "a-percentage-inner-text"
    }, [o("span", null, [r.value])])]), e.textInside && !l.value && o("div", {
      class: "a-percentage-outer-text",
      style: {
        marginLeft: a.value + "%"
      }
    }, [r.value])]), !e.textInside && o("div", {
      class: "a-percentage-text"
    }, [o("span", null, [r.value])])]);
  }
}), Co = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), Io = Co($o);
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
    const a = p(), l = () => t.default ? t.default() : "", s = () => t.dropdown ? t.dropdown() : "", r = () => o(Ie, {
      placement: e.placement,
      trigger: e.trigger,
      width: "max-content",
      padding: "0",
      ref: a
    }, {
      default: () => o("div", {
        class: "slot-dropdown"
      }, [s()]),
      reference: () => l()
    });
    return M("on-click-dropdown-item", (f) => {
      n("command", f), e.hideOnClick && a.value.hiddenPopover();
    }), () => o("div", {
      class: "a-dropdown"
    }, [e.splitButton ? o("div", {
      class: "split-button-content"
    }, [o("div", {
      onClick: () => n("click")
    }, [o(me, {
      class: "left",
      type: e.type
    }, {
      default: () => [t.default && t.default()]
    })]), o(Ie, {
      placement: e.placement,
      trigger: e.trigger,
      width: "max-content",
      padding: "0",
      ref: a
    }, {
      default: () => o("div", {
        class: "slot-dropdown"
      }, [s()]),
      reference: () => o(me, {
        class: "right",
        type: e.type
      }, {
        default: () => [o(G, {
          name: "arrow-down"
        }, null)]
      })
    })]) : r()]);
  }
}), xo = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), Ao = xo(Vo);
const _o = /* @__PURE__ */ S({
  name: "ADropdownMenu",
  setup(e, {
    emit: n,
    slots: t
  }) {
    return () => o("div", {
      class: "a-dropdown-menu-content"
    }, [t.default && t.default()]);
  }
}), Do = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), Eo = Do(_o);
const Bo = /* @__PURE__ */ S({
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
    const a = B("on-click-dropdown-item", (s) => {
    }), l = () => typeof e.icon == "string" ? o(G, {
      name: e.icon
    }, null) : typeof e.icon == "object" ? e.icon : "";
    return () => o(se, null, [e.divided && o("div", {
      class: "divided"
    }, null), o("div", {
      class: `a-dropdown-item ${e.disabled && "disable"}`,
      onClick: () => !e.disabled && a(e.command)
    }, [o("div", {
      style: {
        marginRight: "5px"
      }
    }, [l()]), ae(" "), t.default && t.default()])]);
  }
}), Mo = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), To = Mo(Bo);
const Ro = /* @__PURE__ */ S({
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
    const {
      ZIndex: l,
      setZIndex: s
    } = Oe(), r = p(l);
    s(r.value);
    const u = p(null), f = p(e.modelValue), d = E(() => ({
      width: e.width,
      top: e.alignCenter ? "40%" : e.offsetTop
    }));
    x(() => e.modelValue, (y) => {
      setTimeout(() => {
        f.value = y;
      }, y ? 0 : 80), y ? e.modal && (document.body.style.overflow = "hidden") : e.modal && (document.body.style.overflow = "auto");
    });
    const c = () => {
      e.modal ? u.value.showModal() : u.value.show();
    }, h = () => u.value.close(), i = (y) => {
      n("update:modelValue", !1), n(y);
    }, v = (y) => {
      y.target.className === "a-dialog-content" && e.closeOnClickModal && i("close-click");
    };
    a({
      showModal: c,
      closeModal: h
    });
    const m = E(() => t.default ? e.destroyOnClose ? f.value && t.default() : t.default() : "");
    return () => o(Le, {
      to: "body"
    }, {
      default: () => [o(pe, {
        name: "dialog"
      }, {
        default: () => [z(o("div", {
          class: "a-dialog-content",
          onClick: (y) => v(y),
          style: {
            zIndex: r.value
          }
        }, [o("div", {
          class: "dialog-box",
          style: d.value
        }, [z(o("div", {
          class: "a-dialog-header",
          style: {
            justifyContent: e.center ? "center" : "left"
          }
        }, [o("div", {
          class: "title"
        }, [z(o(G, {
          style: "font-size:20px;margin-right:5px",
          name: e.icon
        }, null), [[W, e.icon]]), e.title])]), [[W, e.title]]), o("div", {
          class: "close-btn",
          onClick: () => i("close-click")
        }, [o(G, {
          name: "close"
        }, null)]), o("div", {
          class: "a-dialog-body"
        }, [m.value]), o("div", {
          class: "a-dialog-footer",
          style: {
            justifyContent: e.center ? "center" : "right"
          }
        }, [t.footer ? t.footer() : o(se, null, [z(o(me, {
          onClick: () => i("cancel-click")
        }, {
          default: () => [e.cancelButtonText]
        }), [[W, e.showCancelButton]]), z(o(me, {
          style: "margin-right:0px",
          onClick: () => i("confirm-click"),
          type: "primary"
        }, {
          default: () => [e.confirmButtonText]
        }), [[W, e.showConfirmButton]])])])])]), [[W, f.value]])]
      })]
    });
  }
}), Lo = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), Po = Lo(Ro);
const Oo = {
  small: "8px",
  default: "12px",
  large: "16px"
}, No = /* @__PURE__ */ S({
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
    const a = E(() => {
      switch (e.size) {
        case "small":
        case "default":
        case "large":
          return Oo[e.size];
        default:
          return e.size + "px";
      }
    }), l = E(() => ({
      alignItems: e.align,
      gap: a.value,
      flexDirection: e.direction
    }));
    return () => o("div", {
      class: "a-space",
      style: l.value
    }, [n.default && n.default()]);
  }
}), Fo = (e) => (e.install = (n) => {
  const t = e.name;
  n.component(t, e);
}, e), xt = Fo(No);
const rt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ABreadcrumb: po,
  ABreadcrumbItem: bo,
  AButton: me,
  ACheckbox: je,
  ACheckboxGroup: Ll,
  ACollapse: zt,
  ACollapseItem: Kt,
  ADatePicker: Ln,
  ADialog: Po,
  ADrawer: $l,
  ADropdown: Ao,
  ADropdownItem: To,
  ADropdownMenu: Eo,
  AForm: Nn,
  AFormItem: jn,
  AIcon: G,
  AInput: Ee,
  AInputNumber: ea,
  ALoading: Ql,
  AMenu: ml,
  AMenuItem: gl,
  APagination: ro,
  APopover: Ie,
  AProgress: Io,
  ARadio: Vt,
  ARadioGroup: Aa,
  ARate: en,
  ARotation: Qa,
  ARotationItem: ao,
  AScrollbar: Re,
  ASelect: $t,
  ASlider: So,
  ASpace: xt,
  ASubMenu: wl,
  ASwitch: Wl,
  ATable: Ea,
  ATabs: Gt,
  ATabsPanel: Zt,
  ATag: ql,
  ATree: ma,
  Tooltip: $e
}, Symbol.toStringTag, { value: "Module" })), Be = {
  SUCCESS: "success",
  WARNING: "warning",
  Message: "message",
  ERROR: "error"
};
const Ho = /* @__PURE__ */ S({
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
    const a = e, l = p(!1), s = j({
      messageVisible: !1,
      top: 0
    }), { messageVisible: r, top: u } = _e(s), f = () => {
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
      setMessageTop: (i) => (s.top = i, i),
      height: 45,
      margin: 10
    }), (i, v) => (I(), Q(pe, { name: "a-message-fade" }, {
      default: U(() => [
        fe(r) ? (I(), R("div", {
          key: 0,
          ref: "messageRef",
          style: oe({ top: fe(u) + "px" }),
          class: "a-message"
        }, [
          D("div", {
            class: "a-message-content",
            onMouseenter: v[0] || (v[0] = (m) => c(!0)),
            onMouseleave: v[1] || (v[1] = (m) => c(!1))
          }, [
            D("span", {
              style: { "margin-right": "10px", "font-size": "18px" },
              class: J(`iconfont ${f()} ${a.type}`)
            }, null, 2),
            D("div", null, ee(a.message), 1)
          ], 32)
        ], 4)) : he("", !0)
      ]),
      _: 1
    }));
  }
}), Ve = p([]), it = function(e) {
  const n = Ye(Ho, e);
  zo(n, e.duration);
};
Object.values(Be).forEach((e) => {
  it[e] = (n) => (n.type = e, it(n));
});
const zo = (e, n) => {
  const t = document.createDocumentFragment(), a = e.mount(t);
  Ve.value.push(a), document.body.appendChild(t), ct(a), a.setMessageVisible(!0), x(
    () => Ve.value,
    () => {
      ct(a);
    }
  ), x(
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
      e.unmount(), Ve.value = Ve.value.filter(
        (a) => a !== n
      ), clearTimeout(n.timer), n.timer = null;
    });
  }, t || 3e3);
}, ct = (e) => {
  const { setMessageTop: n, height: t, margin: a } = e, l = on(Ve.value, e);
  n(a * (l + 1) + t * l);
};
const Yo = { class: "a-message-title" }, Wo = { class: "title" }, Ko = { class: "a-message-content" }, jo = { class: "a-message-footer" }, Uo = /* @__PURE__ */ S({
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
    const t = e, { ZIndex: a, setZIndex: l } = Oe(), s = p(a);
    l(s.value);
    const r = j({
      visible: !1,
      promptValue: "",
      btnType: "confirm"
    }), { visible: u } = _e(r), f = (y) => {
      r.visible = y, r.visible ? v() : m();
    }, d = () => {
      r.btnType = "confirm", f(!1);
    }, c = () => {
      r.btnType = "cancel", f(!1);
    }, h = () => {
      t.mantleClose && c();
    }, i = ({ fied: y }) => {
      switch (y) {
        case (!y || "confirm"):
          return Ge("span", null, t.content);
        case "prompt":
          return Ge("input", {
            value: r.promptValue,
            onInput: ($) => r.promptValue = $.target.value,
            class: "messageInput"
          });
      }
    }, v = () => {
      document.body.style.overflow = "hidden";
    }, m = () => {
      document.body.style.removeProperty("overflow");
    };
    return n({
      setVisible: f,
      state: r
    }), (y, $) => (I(), Q(Le, { to: "body" }, [
      o(pe, { name: "modal" }, {
        default: U(() => [
          fe(u) ? (I(), R("div", {
            key: 0,
            class: "a-message-box",
            style: oe([{ zIndex: s.value }]),
            onClick: h
          }, [
            D("div", {
              class: "a-message-box-wrapper",
              onClick: $[0] || ($[0] = ht(() => {
              }, ["stop"]))
            }, [
              D("div", Yo, [
                D("div", Wo, ee(e.title), 1),
                o(fe(G), { name: "close" })
              ]),
              D("div", Ko, [
                o(i, {
                  fied: t.field
                }, null, 8, ["fied"])
              ]),
              D("div", jo, [
                o(fe(xt), null, {
                  default: U(() => [
                    e.showCancelBtn ? (I(), Q(fe(me), {
                      key: 0,
                      onClick: c
                    }, {
                      default: U(() => [
                        ae(ee(e.cancelBtnText), 1)
                      ]),
                      _: 1
                    })) : he("", !0),
                    o(fe(me), {
                      type: "primary",
                      onClick: d
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
  const n = Ye(Uo, e);
  return new Promise((t, a) => {
    ze.length > 0 || Go(n, { resolve: t, reject: a });
  });
};
At.forEach((e) => {
  dt[e] = (n) => (n.field = e, dt(n));
});
const Go = (e, { resolve: n, reject: t }) => {
  const a = document.createDocumentFragment(), l = e.mount(a);
  document.body.appendChild(a), l.setVisible(!0), ze.push(l), x(l.state, (s) => {
    if (!s.visible) {
      switch (s.btnType) {
        case "cancel":
          t(!1);
          break;
        case "confirm":
          n(s.promptValue);
          break;
      }
      setTimeout(() => {
        e.unmount(l);
      }, 100), ze = [];
    }
  });
}, Xo = {
  install: (e) => {
    for (let n in rt)
      e.use(rt[n]);
  }
};
export {
  po as ABreadcrumb,
  bo as ABreadcrumbItem,
  me as AButton,
  je as ACheckbox,
  Ll as ACheckboxGroup,
  zt as ACollapse,
  Kt as ACollapseItem,
  Ln as ADatePicker,
  Po as ADialog,
  $l as ADrawer,
  Ao as ADropdown,
  To as ADropdownItem,
  Eo as ADropdownMenu,
  Nn as AForm,
  jn as AFormItem,
  G as AIcon,
  Ee as AInput,
  ea as AInputNumber,
  Ql as ALoading,
  ml as AMenu,
  gl as AMenuItem,
  it as AMessage,
  dt as AMessageBox,
  ro as APagination,
  Ie as APopover,
  Io as AProgress,
  Vt as ARadio,
  Aa as ARadioGroup,
  en as ARate,
  Qa as ARotation,
  ao as ARotationItem,
  Re as AScrollbar,
  $t as ASelect,
  So as ASlider,
  xt as ASpace,
  wl as ASubMenu,
  Wl as ASwitch,
  Ea as ATable,
  Gt as ATabs,
  Zt as ATabsPanel,
  ql as ATag,
  ma as ATree,
  $e as Tooltip,
  Xo as default
};
