(function (e, d) {
  typeof exports == "object" && typeof module != "undefined"
    ? (module.exports = d(require("vue")))
    : typeof define == "function" && define.amd
    ? define(["vue"], d)
    : ((e = typeof globalThis != "undefined" ? globalThis : e || self),
      (e.VuejsPaginateNext = d(e.Vue)));
})(this, function (e) {
  "use strict";
  var d = (s, n) => {
    const t = s.__vccOpts || s;
    for (const [c, i] of n) t[c] = i;
    return t;
  };
  const g = {
      data() {
        return { innerValue: 1 };
      },
      props: {
        modelValue: { type: Number },
        pageCount: { type: Number, required: !0 },
        initialPage: { type: Number, default: 1 },
        forcePage: { type: Number },
        clickHandler: { type: Function, default: () => {} },
        pageRange: { type: Number, default: 3 },
        marginPages: { type: Number, default: 1 },
        prevText: { type: String, default: "Prev" },
        nextText: { type: String, default: "Next" },
        breakViewText: { type: String, default: "\u2026" },
        containerClass: { type: String, default: "pagination" },
        pageClass: { type: String, default: "page-item" },
        pageLinkClass: { type: String, default: "page-link" },
        prevClass: { type: String, default: "page-item" },
        prevLinkClass: { type: String, default: "page-link" },
        nextClass: { type: String, default: "page-item" },
        nextLinkClass: { type: String, default: "page-link" },
        breakViewClass: { type: String },
        breakViewLinkClass: { type: String },
        activeClass: { type: String, default: "active" },
        disabledClass: { type: String, default: "disabled" },
        noLiSurround: { type: Boolean, default: !1 },
        firstLastButton: { type: Boolean, default: !1 },
        firstButtonText: { type: String, default: "First" },
        lastButtonText: { type: String, default: "Last" },
        hidePrevNext: { type: Boolean, default: !1 },
      },
      computed: {
        selected: {
          get: function () {
            return this.modelValue || this.innerValue;
          },
          set: function (s) {
            this.innerValue = s;
          },
        },
        pages: function () {
          let s = {};
          if (this.pageCount <= this.pageRange)
            for (let n = 0; n < this.pageCount; n++) {
              let t = {
                index: n,
                content: n + 1,
                selected: n === this.selected - 1,
              };
              s[n] = t;
            }
          else {
            const n = Math.floor(this.pageRange / 2);
            let t = (l) => {
                let r = {
                  index: l,
                  content: l + 1,
                  selected: l === this.selected - 1,
                };
                s[l] = r;
              },
              c = (l) => {
                let r = { disabled: !0, breakView: !0 };
                s[l] = r;
              };
            for (let l = 0; l < this.marginPages; l++) t(l);
            let i = 0;
            this.selected - n > 0 && (i = this.selected - 1 - n);
            let a = i + this.pageRange - 1;
            a >= this.pageCount &&
              ((a = this.pageCount - 1), (i = a - this.pageRange + 1));
            for (let l = i; l <= a && l <= this.pageCount - 1; l++) t(l);
            i > this.marginPages && c(i - 1),
              a + 1 < this.pageCount - this.marginPages && c(a + 1);
            for (
              let l = this.pageCount - 1;
              l >= this.pageCount - this.marginPages;
              l--
            )
              t(l);
          }
          return s;
        },
      },
      methods: {
        handlePageSelected(s) {
          this.selected !== s &&
            ((this.innerValue = s),
            this.$emit("update:modelValue", s),
            this.clickHandler(s));
        },
        prevPage() {
          this.selected <= 1 || this.handlePageSelected(this.selected - 1);
        },
        nextPage() {
          this.selected >= this.pageCount ||
            this.handlePageSelected(this.selected + 1);
        },
        firstPageSelected() {
          return this.selected === 1;
        },
        lastPageSelected() {
          return this.selected === this.pageCount || this.pageCount === 0;
        },
        selectFirstPage() {
          this.selected <= 1 || this.handlePageSelected(1);
        },
        selectLastPage() {
          this.selected >= this.pageCount ||
            this.handlePageSelected(this.pageCount);
        },
      },
      beforeMount() {
        this.innerValue = this.initialPage;
      },
      beforeUpdate() {
        this.forcePage !== void 0 &&
          this.forcePage !== this.selected &&
          (this.selected = this.forcePage);
      },
    },
    o = ["tabindex", "innerHTML"],
    k = ["tabindex", "innerHTML"],
    C = ["onClick", "onKeyup"],
    m = ["tabindex", "innerHTML"],
    f = ["tabindex", "innerHTML"],
    y = ["innerHTML"],
    P = ["innerHTML"],
    x = ["onClick", "onKeyup"],
    h = ["innerHTML"],
    b = ["innerHTML"];
  function B(s, n, t, c, i, a) {
    return t.noLiSurround
      ? (e.openBlock(),
        e.createElementBlock(
          "div",
          { key: 1, class: e.normalizeClass(t.containerClass) },
          [
            t.firstLastButton
              ? (e.openBlock(),
                e.createElementBlock(
                  "a",
                  {
                    key: 0,
                    onClick: n[8] || (n[8] = (l) => a.selectFirstPage()),
                    onKeyup:
                      n[9] ||
                      (n[9] = e.withKeys(
                        (l) => a.selectFirstPage(),
                        ["enter"]
                      )),
                    class: e.normalizeClass([
                      t.pageLinkClass,
                      a.firstPageSelected() ? t.disabledClass : "",
                    ]),
                    tabindex: "0",
                    innerHTML: t.firstButtonText,
                  },
                  null,
                  42,
                  y
                ))
              : e.createCommentVNode("", !0),
            a.firstPageSelected() && t.hidePrevNext
              ? e.createCommentVNode("", !0)
              : (e.openBlock(),
                e.createElementBlock(
                  "a",
                  {
                    key: 1,
                    onClick: n[10] || (n[10] = (l) => a.prevPage()),
                    onKeyup:
                      n[11] ||
                      (n[11] = e.withKeys((l) => a.prevPage(), ["enter"])),
                    class: e.normalizeClass([
                      t.prevLinkClass,
                      a.firstPageSelected() ? t.disabledClass : "",
                    ]),
                    tabindex: "0",
                    innerHTML: t.prevText,
                  },
                  null,
                  42,
                  P
                )),
            (e.openBlock(!0),
            e.createElementBlock(
              e.Fragment,
              null,
              e.renderList(
                a.pages,
                (l) => (
                  e.openBlock(),
                  e.createElementBlock(
                    e.Fragment,
                    null,
                    [
                      l.breakView
                        ? (e.openBlock(),
                          e.createElementBlock(
                            "a",
                            {
                              key: l.index,
                              class: e.normalizeClass([
                                t.pageLinkClass,
                                t.breakViewLinkClass,
                                l.disabled ? t.disabledClass : "",
                              ]),
                              tabindex: "0",
                            },
                            [
                              e.renderSlot(
                                s.$slots,
                                "breakViewContent",
                                {},
                                () => [
                                  e.createTextVNode(
                                    e.toDisplayString(t.breakViewText),
                                    1
                                  ),
                                ]
                              ),
                            ],
                            2
                          ))
                        : l.disabled
                        ? (e.openBlock(),
                          e.createElementBlock(
                            "a",
                            {
                              key: l.index,
                              class: e.normalizeClass([
                                t.pageLinkClass,
                                l.selected ? t.activeClass : "",
                                t.disabledClass,
                              ]),
                              tabindex: "0",
                            },
                            e.toDisplayString(l.content),
                            3
                          ))
                        : (e.openBlock(),
                          e.createElementBlock(
                            "a",
                            {
                              key: l.index,
                              onClick: (r) => a.handlePageSelected(l.index + 1),
                              onKeyup: e.withKeys(
                                (r) => a.handlePageSelected(l.index + 1),
                                ["enter"]
                              ),
                              class: e.normalizeClass([
                                t.pageLinkClass,
                                l.selected ? t.activeClass : "",
                              ]),
                              tabindex: "0",
                            },
                            e.toDisplayString(l.content),
                            43,
                            x
                          )),
                    ],
                    64
                  )
                )
              ),
              256
            )),
            a.lastPageSelected() && t.hidePrevNext
              ? e.createCommentVNode("", !0)
              : (e.openBlock(),
                e.createElementBlock(
                  "a",
                  {
                    key: 2,
                    onClick: n[12] || (n[12] = (l) => a.nextPage()),
                    onKeyup:
                      n[13] ||
                      (n[13] = e.withKeys((l) => a.nextPage(), ["enter"])),
                    class: e.normalizeClass([
                      t.nextLinkClass,
                      a.lastPageSelected() ? t.disabledClass : "",
                    ]),
                    tabindex: "0",
                    innerHTML: t.nextText,
                  },
                  null,
                  42,
                  h
                )),
            t.firstLastButton
              ? (e.openBlock(),
                e.createElementBlock(
                  "a",
                  {
                    key: 3,
                    onClick: n[14] || (n[14] = (l) => a.selectLastPage()),
                    onKeyup:
                      n[15] ||
                      (n[15] = e.withKeys(
                        (l) => a.selectLastPage(),
                        ["enter"]
                      )),
                    class: e.normalizeClass([
                      t.pageLinkClass,
                      a.lastPageSelected() ? t.disabledClass : "",
                    ]),
                    tabindex: "0",
                    innerHTML: t.lastButtonText,
                  },
                  null,
                  42,
                  b
                ))
              : e.createCommentVNode("", !0),
          ],
          2
        ))
      : (e.openBlock(),
        e.createElementBlock(
          "ul",
          { key: 0, class: e.normalizeClass(t.containerClass) },
          [
            t.firstLastButton
              ? (e.openBlock(),
                e.createElementBlock(
                  "li",
                  {
                    key: 0,
                    class: e.normalizeClass([
                      t.pageClass,
                      a.firstPageSelected() ? t.disabledClass : "",
                    ]),
                  },
                  [
                    e.createElementVNode(
                      "a",
                      {
                        onClick: n[0] || (n[0] = (l) => a.selectFirstPage()),
                        onKeyup:
                          n[1] ||
                          (n[1] = e.withKeys(
                            (l) => a.selectFirstPage(),
                            ["enter"]
                          )),
                        class: e.normalizeClass(t.pageLinkClass),
                        tabindex: a.firstPageSelected() ? -1 : 0,
                        innerHTML: t.firstButtonText,
                      },
                      null,
                      42,
                      o
                    ),
                  ],
                  2
                ))
              : e.createCommentVNode("", !0),
            a.firstPageSelected() && t.hidePrevNext
              ? e.createCommentVNode("", !0)
              : (e.openBlock(),
                e.createElementBlock(
                  "li",
                  {
                    key: 1,
                    class: e.normalizeClass([
                      t.prevClass,
                      a.firstPageSelected() ? t.disabledClass : "",
                    ]),
                  },
                  [
                    e.createElementVNode(
                      "a",
                      {
                        onClick: n[2] || (n[2] = (l) => a.prevPage()),
                        onKeyup:
                          n[3] ||
                          (n[3] = e.withKeys((l) => a.prevPage(), ["enter"])),
                        class: e.normalizeClass(t.prevLinkClass),
                        tabindex: a.firstPageSelected() ? -1 : 0,
                        innerHTML: t.prevText,
                      },
                      null,
                      42,
                      k
                    ),
                  ],
                  2
                )),
            (e.openBlock(!0),
            e.createElementBlock(
              e.Fragment,
              null,
              e.renderList(
                a.pages,
                (l) => (
                  e.openBlock(),
                  e.createElementBlock(
                    "li",
                    {
                      key: l.index,
                      class: e.normalizeClass([
                        t.pageClass,
                        l.selected ? t.activeClass : "",
                        l.disabled ? t.disabledClass : "",
                        l.breakView ? t.breakViewClass : "",
                      ]),
                    },
                    [
                      l.breakView
                        ? (e.openBlock(),
                          e.createElementBlock(
                            "a",
                            {
                              key: 0,
                              class: e.normalizeClass([
                                t.pageLinkClass,
                                t.breakViewLinkClass,
                              ]),
                              tabindex: "0",
                            },
                            [
                              e.renderSlot(
                                s.$slots,
                                "breakViewContent",
                                {},
                                () => [
                                  e.createTextVNode(
                                    e.toDisplayString(t.breakViewText),
                                    1
                                  ),
                                ]
                              ),
                            ],
                            2
                          ))
                        : l.disabled
                        ? (e.openBlock(),
                          e.createElementBlock(
                            "a",
                            {
                              key: 1,
                              class: e.normalizeClass(t.pageLinkClass),
                              tabindex: "0",
                            },
                            e.toDisplayString(l.content),
                            3
                          ))
                        : (e.openBlock(),
                          e.createElementBlock(
                            "a",
                            {
                              key: 2,
                              onClick: (r) => a.handlePageSelected(l.index + 1),
                              onKeyup: e.withKeys(
                                (r) => a.handlePageSelected(l.index + 1),
                                ["enter"]
                              ),
                              class: e.normalizeClass(t.pageLinkClass),
                              tabindex: "0",
                            },
                            e.toDisplayString(l.content),
                            43,
                            C
                          )),
                    ],
                    2
                  )
                )
              ),
              128
            )),
            a.lastPageSelected() && t.hidePrevNext
              ? e.createCommentVNode("", !0)
              : (e.openBlock(),
                e.createElementBlock(
                  "li",
                  {
                    key: 2,
                    class: e.normalizeClass([
                      t.nextClass,
                      a.lastPageSelected() ? t.disabledClass : "",
                    ]),
                  },
                  [
                    e.createElementVNode(
                      "a",
                      {
                        onClick: n[4] || (n[4] = (l) => a.nextPage()),
                        onKeyup:
                          n[5] ||
                          (n[5] = e.withKeys((l) => a.nextPage(), ["enter"])),
                        class: e.normalizeClass(t.nextLinkClass),
                        tabindex: a.lastPageSelected() ? -1 : 0,
                        innerHTML: t.nextText,
                      },
                      null,
                      42,
                      m
                    ),
                  ],
                  2
                )),
            t.firstLastButton
              ? (e.openBlock(),
                e.createElementBlock(
                  "li",
                  {
                    key: 3,
                    class: e.normalizeClass([
                      t.pageClass,
                      a.lastPageSelected() ? t.disabledClass : "",
                    ]),
                  },
                  [
                    e.createElementVNode(
                      "a",
                      {
                        onClick: n[6] || (n[6] = (l) => a.selectLastPage()),
                        onKeyup:
                          n[7] ||
                          (n[7] = e.withKeys(
                            (l) => a.selectLastPage(),
                            ["enter"]
                          )),
                        class: e.normalizeClass(t.pageLinkClass),
                        tabindex: a.lastPageSelected() ? -1 : 0,
                        innerHTML: t.lastButtonText,
                      },
                      null,
                      42,
                      f
                    ),
                  ],
                  2
                ))
              : e.createCommentVNode("", !0),
          ],
          2
        ));
  }
  var S = d(g, [["render", B]]);
  return S;
});
