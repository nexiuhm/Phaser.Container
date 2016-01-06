Phaser.Container = function(game, parent, name, addToStage, enableBody, physicsBodyType) {
    Phaser.Group.call(this, game, parent, name, addToStage, enableBody, physicsBodyType);
    this.namedChildren = {};

};

Phaser.Container.prototype = Object.create(Phaser.Group.prototype);
Phaser.Container.prototype.constructor = Phaser.Container;

/** @override */
Phaser.Container.prototype.add = function(child, childName) { //childname is optional
    var child = Phaser.Group.prototype.add.call(this, child);

    if (childName && typeof childName === 'string') {
        this.namedChildren[childName] = child;
    }

    return child;
}

/** @override */
Phaser.Container.prototype.removeAll = function(destroy, silent) {
    this.namedChildren = {};
    Phaser.Group.prototype.removeAll.call(this, destroy, silent);
}

/** @override */
Phaser.Container.prototype.remove = function(childOrChildName, destroy, silent) {
    var child = childOrChildName;

    if (typeof child === 'string') {
        if (this.namedChildren[child]) {
            var child = this.namedChildren[child];
            Phaser.Group.prototype.remove.call(this, child, destroy, silent);
            delete this.namedChildren[child];
        }
    } else {
        return Phaser.Group.prototype.remove.call(this, child, destroy, silent);

    }

}

/** @override */
Phaser.Container.prototype.getChild = function(childName) {
    if (this.namedChildren[childName]) {
        return this.namedChildren[childName];
    } else {
        return null;
    }
}

