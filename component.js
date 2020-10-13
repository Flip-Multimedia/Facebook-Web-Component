/*
 * (C) Copyright 2020 Flip Multimedia (https://flipweb.co.uk) and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Contributors:
 *  @author James Gibbons <jgibbons@flipweb.co.uk>
 * 
 * 
 */

const TYPES = require('../../utils').componentTypes;

module.exports.CoreComponent = class DynamicSpacerComponent {
  
  /**
   *
   *
   * @static
   * @return {*} 
   */
  static getCategory() {
    return 'social';
  }

  /**
   *
   *
   * @static
   * @return {*} 
   */
  static getDesciption() {
    return 'Embed Facebook page widget into your website.';
  }

  /**
   *
   *
   * @static
   * @return {*} 
   */
  static getDefault() {
    return {
      facebookPageUrl: "https://facebook.com/facebook",
      facebookHideCover: false,
      facebookUseSmallHeader: false,

      styles: {
        base: {
          width: '100%',
          height: '25px'
        }
      }
    }
  }

  /**
   *
   *
   * @static
   * @param {*} component
   * @return {*} 
   */
  static render(component) {
    const TYPES = require('../../utils.js').componentTypes;

    return `
    <div class="fb-page" 
         data-href="${component.facebookPageUrl}" 
         data-tabs="timeline" data-width="${component.width}" 
         data-height="${component.height}" 
         data-small-header="${component.facebookUseSmallHeader.toString()}" 
         data-adapt-container-width="true" 
         data-hide-cover="${component.facebookHideCover.toString()}" 
         data-show-facepile="true">
    </div>
    `;
  }

  /**
   * Creates an instance of DynamicSpacerComponent.
   * @param {*} component
   */
  constructor(component) {
    this.type = 'facebookPage';
    
    this.facebookPageUrl = '';
    this.facebookUseSmallHeader = false;
    this.facebookHideCover = false;

    this.height = '350px';

    this.styles = {
      base: {
        width: '100%',
        height: '25px'
      }
    };

    // handle null component
    if(!component) {
      component = {};
    }

    if(component.facebookPageUrl) {
      this.facebookPageUrl = component.facebookPageUrl;
    }

    if(component.styles) {
      this.styles = component.styles;
    }
  }

  /**
   *
   *
   */
  defineEditorUI() {
    const TYPES = require('../../utils.js').componentTypes;
    const ui = new TYPES.EditorUI();

    ui.addSection(new TYPES.EditorUISection('Spacer Dimensions', [
      new TYPES.EditorUIAttribute({
        label: 'Spacer Height',
        uiInputType: 'numberPx',

        targetAttribute: 'height',

        isStylesAttribute: true,
        targetStyleElement: 'base',
        targetStyleAttribute: true
      })
    ]));

    ui.addSection(new TYPES.EditorUISection('Facebook Page Settings', [
      new TYPES.EditorUIAttribute({
        label: 'Facebook page URL',
        uiInputType: 'text',
        
        targetAttribute: 'facebookPageUrl'
      }),

      new TYPES.EditorUIAttribute({
        label: 'Cover photo size',

        uiInputType: 'selector',
        uiInputSelectOptions: {
          'Large cover photo': false, 
          'Small cover photo': true
        },

        targetAttribute: 'facebookUseSmallHeader'
      }),

      new TYPES.EditorUIAttribute({
        label: 'Hide cover photo',
        
        uiInputType: 'selector',
        uiInputSelectOptions: {
          'Show cover photo': false,
          'Hide cover photo': true
        },

        targetAttribute: 'facebookHideCover'
      })
    ]));

    ui.addSection(new TYPES.EditorUISection('Dimensions', [
      new TYPES.EditorUIAttribute({
        label: 'Width (PX)',

        uiInputType: 'numberPx',
        targetAttribute: 'width'
      })
    ]));

    return ui;
  }
}