export default (editor, opt = {}) => {
  const c = opt;
  const dc = editor.DomComponents;
  const defaultType = dc.getType('default');
  const defaultModel = defaultType.model;
  const menuType = 'navbar-menu-icon';

  dc.addType(menuType, {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': c.labelMenu,
        draggable: false,
        // droppable: false,
        copyable: false,
        removable: false,
        script: function () {
          var transEndAdded;
          var isAnimating = 0;
          var stringCollapse = 'gjs-collapse';
          var clickEvent = 'click';
          var transitProp = 'max-height';
          var transitTiming = 'ease-in-out';
          var transitSpeed = 0.25;

          var getTransitionEvent = function() {
            var t, el = document.createElement('void');
            var transitions = {
              'transition': 'transitionend',
              'OTransition': 'oTransitionEnd',
              'MozTransition': 'transitionend',
              'WebkitTransition': 'webkitTransitionEnd'
            }

            for (t in transitions) {
              if (el.style[t] !== undefined){
                return transitions[t];
              }
            }
          }

          var transitEndEvent = getTransitionEvent();

          var getElHeight = function(el) {
            var style = window.getComputedStyle(el);
            var elDisplay = style.display;
            var elPos = style.position;
            var elVis = style.visibility;
            var currentHeight = style.height;
            var elMaxHeight = parseInt(style[transitProp]);

            if (elDisplay !== 'none' && elMaxHeight !== '0') {
              return el.offsetHeight;
            }

            el.style.height = 'auto';
            el.style.display = 'block';
            el.style.position = 'absolute';
            el.style.visibility = 'hidden';
            var height = el.offsetHeight;
            el.style.height = '';
            el.style.display = '';
            el.style.position = '';
            el.style.visibility = '';

            return height;
          };

          var toggleSlide = function(el) {
            isAnimating = 1;
            var elMaxHeight = getElHeight(el);
            var elStyle = el.style;
            elStyle.display = 'block';
            elStyle.transition = transitProp + ' ' + transitSpeed + 's ' + transitTiming;
            elStyle.overflowY = 'hidden';

            if (elStyle[transitProp] == '') {
              elStyle[transitProp] = 0;
            }

            if (parseInt(elStyle[transitProp]) == 0) {
              elStyle[transitProp] = '0';
              setTimeout(function() {
                  elStyle[transitProp] = elMaxHeight + 'px';
              }, 10);
            } else {
              elStyle[transitProp] = '0';
            }
          }

          var toggle = function(e) {
            e.preventDefault();

            if (isAnimating) {
              return;
            }

            var navParent = this.closest(`.gpd-navbar`);
            var navItems = navParent.querySelector(`.gpd-navbar__items`);
            toggleSlide(navItems);

            if (!transEndAdded) {
              navItems.addEventListener(transitEndEvent, function() {
                isAnimating = 0;
                var itemsStyle = navItems.style;
                if (parseInt(itemsStyle[transitProp]) == 0) {
                  itemsStyle.display = '';
                  itemsStyle[transitProp] = '';
                }
              });
              transEndAdded = 1;
            }
          };

          if ( !(stringCollapse in this ) ) {
            this.addEventListener(clickEvent, toggle);
          }

          this[stringCollapse] = 1;
        },
      },
    }, {
      isComponent(el) {
        if(el.getAttribute &&
          el.getAttribute('data-gjs-type') == menuType) {
          return {type: menuType};
        }
      },
    }),
    view: defaultType.view,
  });

  dc.addType('navbar',{
    model:{
      defaults:{
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 9c0-.6-.5-1-1.3-1H3.4C2.5 8 2 8.4 2 9v6c0 .6.5 1 1.3 1h17.4c.8 0 1.3-.4 1.3-1V9zm-1 6H3V9h18v6zM5 10h2c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1H5a1 1 0 01-1-1v-2c0-.6.4-1 1-1zm10 0h5v1h-5v-1zm0 3h5v1h-5v-1zm0-1.5h5v1h-5v-1z"></path></svg>`,
        'custom-name': 'Navbar',
        traits: [
          {
            name: 'position',
            label: 'Positon',
            type: 'select',
            options: [
              {value: 'default', name: 'Default'},
              {value: 'detached', name: 'Detached'},
              {value: 'sticky', name: 'sticky'}
            ],
          }
        ]
      },
      init(){
        this.listenTo(this.model, 'default', this.changePos)
      },
      changePos(){
        const post = this.get('position');
        if (post === 'detached') {
          $('.gpd-navbar').addStyle({"position" :"absolute"});
          $('.gpd-Navbar').addStyle({"z-index:10;" :"10"});
        }
      }
    }
  })
}
