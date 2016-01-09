Phaser.Container = function(game, parent, name, addToStage, enableBody, physicsBodyType) {
    Phaser.Group.call(this, game, parent, name, addToStage, enableBody, physicsBodyType);
    this.namedChildren = {};

};

Phaser.Container.prototype = Object.create(Phaser.Group.prototype);
Phaser.Container.prototype.constructor = Phaser.Container;

/** @override */
Phaser.Container.prototype.add = function(child, childName) { //childname is optional
    var _child = Phaser.Group.prototype.add.call(this, child);

    if (childName && typeof childName === 'string') {
        this.namedChildren[childName] = _child;
    }

    return _child;
};

/** @override */
Phaser.Container.prototype.removeAll = function(destroy, silent) {
    this.namedChildren = {};
    Phaser.Group.prototype.removeAll.call(this, destroy, silent);
};

/** @override */
Phaser.Container.prototype.remove = function(childOrChildName, destroy, silent) {
    var _child = childOrChildName;

    if (typeof _child === 'string') {
        if (this.namedChildren.hasOwnProperty(_child)) {
            _child = this.namedChildren[_child];
            delete this.namedChildren[_child];
        }
    }
    
    return Phaser.Group.prototype.remove.call(this, _child, destroy, silent);
};

/** @override */
Phaser.Container.prototype.getChild = function(childName) {
    if (this.namedChildren.hasOwnProperty(childName)) {
        return this.namedChildren[childName];
    } else {
        return null;
    }
};

