import { RichTreeView } from "@mui/x-tree-view";
import SvgIcon from "@mui/material/SvgIcon";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";
import { styled, alpha } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { RiGitBranchFill, RiGitMergeFill } from "react-icons/ri";
import { IoLeafSharp } from "react-icons/io5";

const CustomTreeItem = styled((props) => (
  <TreeItem {...props} data-node-id={props.itemId} />
))(({ theme }) => ({
  color:
    theme?.palette?.mode === "light"
      ? theme?.palette?.grey[800]
      : theme?.palette?.grey[200],
  [`& .${treeItemClasses.content}`]: {
    padding: theme.spacing(0.5, 1),
    margin: theme.spacing(0.2, 0),
    [`& .${treeItemClasses.label}`]: {
      fontSize: "1rem",
      fontWeight: 500,
    },
  },
  [`& .${treeItemClasses.iconContainer}`]: {
    padding: theme.spacing(0, 1.2),
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px solid ${alpha(theme?.palette?.text.primary, 0.4)}`,
  },
}));

function GitBranchIcon(props) {
  return (
    <SvgIcon
      className="text-main"
      fontSize="inherit"
      style={{ width: 26, height: 26 }}
      {...props}
    >
      <RiGitBranchFill />
    </SvgIcon>
  );
}

function GitMergeIcon(props) {
  return (
    <SvgIcon
      className="text-main"
      fontSize="inherit"
      style={{ width: 26, height: 26 }}
      {...props}
    >
      <RiGitMergeFill />
    </SvgIcon>
  );
}

function CloseSquare(props) {
  return (
    <SvgIcon
      className="text-main"
      fontSize="inherit"
      style={{ width: 23, height: 23 }}
      {...props}
    >
      <IoLeafSharp />
    </SvgIcon>
  );
}

const TreeDataGrid = ({
  items,
  setSelectedItem,
  setOpen,
  setId,
  setLastSelectedItem,
  lastSelectedItem,
}) => {
  const [expandedItems, setExpandedItems] = useState([]);

  const handleExpandedItemsChange = (event, itemIds) => {
    setExpandedItems(itemIds);
  };

  const getAllItemsWithChildrenItemIds = (treeItems) => {
    const itemIds = [];
    const registerItemId = (item) => {
      if (item?.children?.length) {
        itemIds.push(item.id);
        item?.children?.forEach(registerItemId);
      }
    };
    treeItems.forEach(registerItemId);

    return itemIds;
  };

  const handleExpandClick = (treeItems) => {
    setExpandedItems(getAllItemsWithChildrenItemIds(treeItems));
  };

  const findNodeById = (nodes, id, parent = null) => {
    for (let node of nodes) {
      if (node.id === id) {
        return { node, parent };
      }
      if (node.children) {
        const result = findNodeById(node.children, id, node);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };

  const handleSelectedItemsChange = (event, ids) => {
    setLastSelectedItem(ids);
    const { node, parent } = findNodeById(items, ids);
    setSelectedItem((prevState) => ({
      ...prevState,
      node,
      parent,
      description: node?.description,
    }));
  };

  const handleItemContextMenu = (event) => {
    event.preventDefault();
    const nodeId = event.target
      .closest("[data-node-id]")
      .getAttribute("data-node-id");
    const { node, parent } = findNodeById(items, nodeId);
    setSelectedItem({ node, parent, description: node?.description });
    setLastSelectedItem(node?.id);
    setId(0);
    setOpen(true);
  };

  useEffect(() => {
    if (items?.length) {
      handleExpandClick(items);
    }
  }, [items]);

  return (
    <div>
      <RichTreeView
        onContextMenu={handleItemContextMenu}
        defaultExpandedItems={["grid"]}
        slots={{
          expandIcon: GitBranchIcon,
          collapseIcon: GitMergeIcon,
          endIcon: CloseSquare,
          item: (props) => <CustomTreeItem {...props} nodeId={props.itemId} />,
        }}
        selectedItems={lastSelectedItem}
        items={items || []}
        expandedItems={expandedItems}
        onExpandedItemsChange={handleExpandedItemsChange}
        onSelectedItemsChange={handleSelectedItemsChange}
      />
    </div>
  );
};

export default TreeDataGrid;