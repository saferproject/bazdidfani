class Node {
  constructor(value) {
    this.value = value;
  }

  getParent(organizationCharts) {
    const findParent = (data, childId) => {
      for (const item of data) {
        if (
          item.children?.length &&
          item.children.some((child) => child.id === childId)
        ) {
          return new Node(item);
        } else if (item.children?.length) {
          const parent = findParent(item.children, childId);
          if (parent) return parent;
        }
      }
      return null;
    };
    return findParent(organizationCharts || [], this?.value?.id);
  }

  getChildren() {
    return this.value.children?.length
      ? this.value.children.map((child) => new Node(child))
      : null;
  }

  isBranch() {
    return !!this.value.children?.length;
  }

  isEqual(to) {
    return to?.value?.id === this?.value?.id;
  }

  toString() {
    return this?.value?.label;
  }
}

export default Node;

export const findNodeByLabel = (nodes, value, type = "label") => {
  for (let node of nodes) {
    // console.log("condition", node[type], value, node[type] == value);
    if (node[type] == value) {
      return node;
    }
    if (node.children) {
      const result = findNodeByLabel(node.children, value, type);
      if (result) {
        return result;
      }
    }
  }
  return null;
};
