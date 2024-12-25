/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        /**
         * @Task1 : Implement the draw function for the SceneNode class.
         */
        
        
        
        
        var transformedMvp = mvp;
        var transformedModelView = modelView;
        var transformedNormals = normalMatrix;
        var transformedModel = modelMatrix;

        // Calculate the transformation matrix for this node
        var localTransformation = this.trs.getTransformationMatrix();
        
        // Apply transformations
        
        var transformedModelView = MatrixMult(modelView, localTransformation);
        var transformedNormals = MatrixMult(normalMatrix, localTransformation);
        var transformedModel = MatrixMult(modelMatrix, localTransformation);
        var transformedMvp = MatrixMult(mvp, localTransformation);
        
        // Draw the MeshDrawer
        if (this.meshDrawer) {
            this.meshDrawer.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }
        // Recursively draw all child nodes
        for (const child of this.children) {
            child.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }
    
    
    }
    

    

}