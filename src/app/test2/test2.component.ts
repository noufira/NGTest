
import {NestedTreeControl} from '@angular/cdk/tree';
import {Component, OnInit, Injectable} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {BehaviorSubject, Observable, of as observableOf} from 'rxjs';


/**
 * File node data with nested structure.
 * Each node has a filename, and a type or a list of children.
 */
export class FileNode {
    children: FileNode[];
    filename: string;
    type: any;
    img: string;
    level: number;
}
  
/**
 * The file structure tree data in string. The data could be parsed into a Json object
 */
// const TREE_DATA = `
// {
//   "Documents": {
//     "angular": {
//       "src": {
//         "core": "ts",
//         "compiler": "ts"
//       }
//     },
//     "material2": {
//       "src": {
//         "button": "ts",
//         "checkbox": "ts",
//         "input": "ts"
//       }
//     }
//   },
//   "Downloads": {
//       "Tutorial": "html",
//       "November": "pdf",
//       "October": "pdf"
//   },
//   "Pictures": {
//       "Sun": "png",
//       "Woods": "jpg",
//       "Photo Booth Library": {
//         "Contents": "dir",
//         "Pictures": "dir"
//       }
//   },
//   "Applications": {
//       "Chrome": "app",
//       "Calendar": "app",
//       "Webstorm": "app"
//   }
// }`;

const TREE_DATA = `
[
    {
        "fileName":"Home", 
        "img":"card_membership", 
        "children":[
            {
                "fileName":"f1.1", 
                "img":"fingerprint"
            }, {
                "fileName":"f1.2", 
                "img":"donut_small" 
            }
        ]
    }, 
    {
        "fileName":"Buttons", 
        "img":"alarm_on", 
        "children":[
            {
                "fileName":"f2.1", 
                "img":"computer"
            }, {
                "fileName":"f2.2", 
                "img":"feedback"
            }
        ]
    },
    {
        "fileName":"Table", 
        "img":"format_list_bulleted", 
        "children":[
            {
                "fileName":"f3.1", 
                "img":"computer",
                "children":[
                    {
                        "fileName":"f3", 
                        "img":"attachment"
                    }
                ]
            }, {
                "fileName":"f2.2", 
                "img":"feedback"
            }
        ]
    }
]`;
  
  /**
   * File database, it can build a tree structured Json object from string.
   * Each node in Json object represents a file or a directory. For a file, it has filename and type.
   * For a directory, it has filename and children (a list of files or directories).
   * The input will be a json object string, and the output is a list of `FileNode` with nested
   * structure.
   */
  @Injectable()
  export class FileDatabase {
    dataChange: BehaviorSubject<FileNode[]> = new BehaviorSubject<FileNode[]>([]);
  
    get data(): FileNode[] { return this.dataChange.value; }
  
    constructor() {
      this.initialize();
    }
  
    initialize() {
      // Parse the string to json object.
      const dataObject = JSON.parse(TREE_DATA);
      //console.log(TREE_DATA);
  
      // Build the tree nodes from Json object. The result is a list of `FileNode` with nested
      //     file node as children.
      const data = this.buildFileTree(dataObject, 0);

  
      // Notify the change.
      this.dataChange.next(data);
    }
  
    /**
     * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
     * The return value is the list of `FileNode`.
     */
    // buildFileTree(value: any, level: number): FileNode[] {
    //     let data: any[] = [];
    //     for (let k in value) {
    //         let v = value[k];
    //         let node = new FileNode();
    //         node.filename = `${k}`;
    //         node.level = level;
    //       //node.img = 'home';
    //         if (v === null || v === undefined) {
    //             // no action
    //         } else if (typeof v === 'object') {
    //             node.children = this.buildFileTree(v, level + 1);
    //         } else {
    //             node.type = v;
    //         }
    //         data.push(node);
    //     }
    //     //console.log(data);
    //     return data;
    // }

    buildFileTree(value: any, level: number): FileNode[] {
        let data: any[] = [];
        for (var i = 0; i < value.length; i++) {
            let obj = value[i];
            let node = new FileNode();
            let child = obj['children'];
            node.filename = obj['fileName'];
            node.img = obj['img'];
            node.level = level;

            if (child === null || child === undefined) {
                // no action
                node.type = '0';
            } else if (typeof child === 'object') {
                node.children = this.buildFileTree(child, level + 1);
            } else {
                node.type = '0';
            }
            data.push(node);
            //console.log(data);
        }
        return data;
    }
  }

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.css'],
  providers: [FileDatabase]
})
export class Test2Component implements OnInit {
    nestedTreeControl: NestedTreeControl<FileNode>;

    nestedDataSource: MatTreeNestedDataSource<FileNode>;

    constructor(database: FileDatabase) {
        this.nestedTreeControl = new NestedTreeControl<FileNode>(this._getChildren);
        this.nestedDataSource = new MatTreeNestedDataSource();

        database.dataChange.subscribe(data => this.nestedDataSource.data = data);
    }

    private _getChildren = (node: FileNode) => { return observableOf(node.children); };

    hasNestedChild = (_: number, nodeData: FileNode) => {return !(nodeData.type); };

    ngOnInit() {
    }

}
