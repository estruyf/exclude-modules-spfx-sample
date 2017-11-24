import * as React from 'react';
import styles from './HelloWorld.module.scss';
import { IHelloWorldProps } from './IHelloWorldProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import Production from '../../../services/production';

// Default
// import Development from "../../../services/development";

/* Solution 1 */
// Include the development service, required for type safety
// import * as Dev from "../../../services/development";


/* Solution 2 */
import * as Dev from "../../../services/development";
let Development: typeof Dev.default = null;
if (DEBUG) {
  Development = require('../../../services/development');
}


export interface IHelloWorldState {
  items: string[];
}

export default class HelloWorld extends React.Component<IHelloWorldProps, IHelloWorldState> {

  constructor(props: IHelloWorldProps) {
    super(props);

    this.state = { items: [] };
  }

  public componentDidMount() {
    if (Environment.type === EnvironmentType.SharePoint ||
      Environment.type === EnvironmentType.ClassicSharePoint) {
        Production.get().then((data: string[]) => {
          this.setState({
            items: data
          });
        });
      }

      /* Solution 1 */
      // The following block will be removed from production bundles
      // if (DEBUG) {
      //   if (Environment.type === EnvironmentType.Local ||
      //     Environment.type === EnvironmentType.Test) {
      //       // Load the required development service module
      //       // Use typeof Dev to maintain type safety
      //       const Development: typeof Dev = require("../../../services/development");
      //       Development.default.get().then((data: string[]) => {
      //         this.setState({
      //           items: data
      //         });
      //       });
      //     }
      //   }

      /* Solution 2 */
      // Still best to wrap this code in a DEBUG statement, as the code will also get removed from the production bundle
      if (DEBUG) {
        if (Environment.type === EnvironmentType.Local ||
            Environment.type === EnvironmentType.Test) {
            // Load the required development service module
            // Use typeof Dev to maintain type safety
            Development.get().then((data: string[]) => {
              this.setState({
                items: data
              });
            });
          }
        }
      }

      public render(): React.ReactElement<IHelloWorldProps> {
        return (
          <div className={styles.helloWorld}>
          {
            this.state.items.length === 0 ? <p>Loading items ...</p> : ''
          }
          <ul>
          {
            this.state.items.map((item, index) => {
              return <li key={index}>{item}</li>;
            })
          }
          </ul>
          </div>
        );
      }
    }
