"use strict"
import { MDCTab } from '@material/tab';
import {MDCTabIndicator} from '@material/tab-indicator';
import {MDCTabBar} from '@material/tab-bar';
import {MDCTabScroller} from '@material/tab-scroller';
import {MDCRipple} from '@material/ripple';
import {MDCMenu} from '@material/menu';
import {MDCTextField} from '@material/textfield';
import {MDCSelect} from '@material/select';
import { MDCIconButtonToggle } from '@material/icon-button';
import {MDCCheckbox} from '@material/checkbox';
import {MDCFormField} from '@material/form-field';



//for shrinked header (not on index and auth)
    const menuBtn = document.querySelector('.menu-btn');
    const menu = new MDCMenu(document.querySelector('.mdc-menu'));
    menu.open = false;
    const iconButtonRipple = new MDCRipple(document.querySelector('.mdc-icon-button')); 
    iconButtonRipple.unbounded = true;
    
    // open minimized menu
    document.body.addEventListener('click', function(e) {

        const menuBtnClicked = e.target.closest('.menu-btn');

        if (e.target === menuBtn && !menuBtn.classList.contains("open-menu")) {
            menu.open = true;
            menuBtn.classList.add('open-menu');
        } else if (menuBtn.classList.contains("open-menu")) {
            menu.open = false; 
            menuBtn.classList.remove('open-menu');
        }
        
    });

    // shrink header by scroll
    document.body.addEventListener("scroll", function() {
        if (document.querySelector(".main-header") && document.documentElement.clientWidth > 795 && Math.round(document.body.scrollTop) >= 50 || Math.round(document.documentElement.scrollTop) >= 50) {
            document.querySelector(".main-header").classList.add('scrolled');
            document.querySelector('.site-nav').style.display = 'none';
            document.querySelector('.site-nav-min').style.display = 'block';
        
        } else if (document.querySelector(".main-header") && document.documentElement.clientWidth > 795) {
            document.querySelector(".main-header").classList.remove('scrolled');
            document.querySelector('.site-nav').style.display = 'flex';
            document.querySelector('.site-nav-min').style.display = 'none';
        }
        
    }, { capture: false, passive: true});


const tab = new MDCTab(document.querySelector('.mdc-tab'));
const tabIndicator = new MDCTabIndicator(document.querySelector('.mdc-tab-indicator'));
const tabBar = new MDCTabBar(document.querySelector('.mdc-tab-bar'));
const tabScroller = new MDCTabScroller(document.querySelector('.mdc-tab-scroller'));


// search and filters
const select = new MDCSelect(document.querySelector('.mdc-select'));
const checkbox = new MDCCheckbox(document.querySelector('.mdc-checkbox'));
const formField = new MDCFormField(document.querySelector('.mdc-form-field'));
formField.input = checkbox;

// card toggle btn   
document.querySelectorAll('.icon-toggle-button').forEach((btn) => {
    new MDCIconButtonToggle(btn);
})

//card
const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action';
const ripples = [].map.call(document.querySelectorAll(selector), function(el) {
  return new MDCRipple(el);
});



