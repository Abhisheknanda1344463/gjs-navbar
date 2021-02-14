import {
  hNavbarRef,
  navbarRef,
  navbarItemsRef,
  menuRef
} from './consts';

export default (editor, opt = {}) => {
  const c = opt;
  const bm = editor.BlockManager;
  const navbarPfx = c.navbarClsPfx || 'navbar';
  const style = c.defaultStyle ? `
  <style>
    .gpd-navbar{
      width:100%;
    }

    .gpd-navbar__menu{
      display:none;
    }

    .gpd-navbar__item{
      flex:0 1 auto;
    }

    .gpd-navbar__item-link{
      color:inherit;
      text-decoration:none;
    }


    @media (max-width: 768px) {
      .gpd-navbar__menu{
        display:block;
      }
      .gpd-navbar__items{
        display:none;
        width:100%;
      }
      .gpd-navbar__items-grid{
        flex-wrap:wrap;
      }
      .gpd-navbar__item{
        flex:1 1 100%;
      }
      .gpd-navbar__item-link{
        width:100%;
      }
    }
  </style>
  ` : '';

  if (c.blocks.indexOf(hNavbarRef) >= 0) {
    bm.add(hNavbarRef, {
      label: `
        <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path class="gjs-block-svg-path" d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z" fill-rule="nonzero"></path>
          <rect class="gjs-block-svg-path" x="15" y="10" width="5" height="1"></rect>
          <rect class="gjs-block-svg-path" x="15" y="13" width="5" height="1"></rect>
          <rect class="gjs-block-svg-path" x="15" y="11.5" width="5" height="1"></rect>
        </svg>
        <div class="gjs-block-label">${c.labelNavbarBlock}</div>`,
      category: c.labelNavbarCategory,
      content: `
        <div class="gpd-navbar" data-gjs-type="navbar">
          <div style="padding:0;" data-gjs-type="container" class="gjs-container gpd-cnt">
            <div style= "justify-content:space-between;align-items:center;min-height:auto;" class="gjs-row gjs-grid"  data-gjs-name= "Grid" data-gjs-type="grid-row">
              <div style = "flex:0 1 auto;" class="cell gjs-clm" data-gjs-type= "grid-item" data-gjs-name= "Column">
                <a style = "min-height:25px;min-width:25px;" data-gjs-type="link-box" class="gjs-link-box"><div data-gjs-type="text">Brand Logo
                  </div></a>
              </div>

              <div style= "flex:0 1 auto;" class="cell gpd-navbar__menu" data-gjs-type="grid-item">
                <a style= "width:35px;height:35px;cursor:pointer;" data-gjs-type="navbar-menu-icon" class="gpd-icon"><svg xmlns="http://www.w3.org/2000/svg" style="pointer-events: none;" viewBox="0 0 24 24"><path data-gjs-type="svg-in" d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2z">
                  </path>
                  </svg></a>
              </div>

              <div style="flex:0 1 auto;" data-gjs-type="grid-item" class="cell gpd-navbar__items">
                <div style = "align-items:center;min-height:auto;"  data-gjs-type="grid-row" class="gjs-row gpd-navbar__items-grid">
                  <div class="cell gpd-navbar__item" data-gjs-name="Column" data-gjs-type="grid-item">
                    <a data-gjs-type="link" class="gpd-navbar__item-link">Home</a>
                  </div>
                  <div  data-gjs-type = "grid-item" data-gjs-name="Column" class="cell gpd-navbar__item">
                    <a data-gjs-type="link" class="gpd-navbar__item-link">About</a>
                  </div>
                  <div data-gjs-type = "grid-item" data-gjs-name="Column" class="cell gpd-navbar__item">
                    <a data-gjs-type="link" class="gpd-navbar__item-link">Contact</a>
                  </div>
                </div>
              </div
            </div>
          </div>
        </div>
        ${style}
      `,
    });
  }
}
