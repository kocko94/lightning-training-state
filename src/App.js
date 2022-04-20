/*
 * If not stated otherwise in this file or this component's LICENSE file the
 * following copyright and licenses apply:
 *
 * Copyright 2020 Metrological
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Lightning, Utils } from '@lightningjs/sdk'

export default class App extends Lightning.Component {
  static getFonts() {
    return [{ family: 'Regular', url: Utils.asset('fonts/Roboto-Regular.ttf') }]
  }

  static _template() {
    return {
      Background: {
        rect: true,
        w: 1920,
        h: 1080,
        color: 0xfffbb03b,
      },
      Text: {
        mount: 0,
        x: 50,
        y: 50,
        text: {
          text: 'No-theme',
          fontFace: 'Regular',
          fontSize: 64,
          textColor: 0xbbffffff,
        },
      },
    }
  }

  static _states() {
    return [
      class DarkTheme extends this {
        $enter() {
          this.tag('Background').patch({
            color: 0xff000000,
          })
          this.tag('Text').patch({
            text: {
              text: 'Dark',
            },
          })
        }
      },
      class LightTheme extends this {
        $enter() {
          this.tag('Background').patch({
            color: 0xfffcdab6,
          })
          this.tag('Text').patch({
            text: {
              text: 'Light',
            },
          })
        }
      },
    ]
  }

  _init() {
    this.theme = 'light'
  }

  _handleEnter() {
    if (this.theme === 'light') {
      this.theme = 'dark'
      this._setState('DarkTheme')
    } else {
      this.theme = 'light'
      this._setState('LightTheme')
    }
    console.debug('handleEnter: theme=' + this.theme)
  }
}
