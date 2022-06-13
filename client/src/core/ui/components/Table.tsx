import * as React from "react";
import {
  DataGrid,
  DeleteRecordDialogOptions,
  HeaderOptions,
  NewRecordDialogOptions,
  PagingOptions,
  SearchOptions,
  TableOptions,
  UpdateRecordDialogOptions
} from "@core-ui/datagrid";
import { TTranslate } from "../../service/locale/TranslationService";

const Table = ({
  translate,
  headerFormManager,
  createModalFormManager,
  updateModalFormManager,
  deleteModalFormManager,
  pagingFormManager,
  tableFormManager,
  searchFormManager,
  onEndUpdate,
  onStartUpdate,
  onStartCreate,
  onEndCreate,
  onCancelCreateModal,
  onCancelUpdateModal,
  className,
  style,
  pagingVisible = true
}: {
  translate: TTranslate;
  headerFormManager?: HeaderOptions;
  createModalFormManager?: NewRecordDialogOptions;
  updateModalFormManager?: UpdateRecordDialogOptions;
  deleteModalFormManager?: DeleteRecordDialogOptions;
  pagingFormManager?: PagingOptions;
  tableFormManager: TableOptions;
  searchFormManager?: SearchOptions;
  onEndUpdate?: (row?: any) => any;
  onStartUpdate?: (row?: any) => any;
  onStartCreate?: (row?: any) => any;
  onEndCreate?: (row?: any) => any;
  onCancelCreateModal?: (row?: any) => any;
  onCancelUpdateModal?: (row?: any) => any;
  className?: string;
  style?: any;
  pagingVisible?: boolean;
}) => {
  const defaultHeaderFormManager = {
    allowCreate: false,
    createActionPosition: "topRight"
  } as HeaderOptions;

  const defaultCreateModalFormManager = {
    cancelButtonLabel: translate("table.modal.actions.cancel"),
    saveButtonLabel: translate("table.modal.actions.save"),
    visible: false,
    Form: {
      key: null,
      ref: null,
      props: {},
      _owner: null
    } as NewRecordDialogOptions
  };

  const defaultUpdateModalFormManager = {
    cancelButtonLabel: translate("table.modal.actions.cancel"),
    saveButtonLabel: translate("table.modal.actions.save"),
    visible: false,
    Form: { key: null, ref: null, props: {}, _owner: null }
  } as UpdateRecordDialogOptions;

  const defaultDeleteModalFormManager = {
    cancelButtonLabel: translate("table.modal.actions.cancel"),
    deleteButtonLabel: translate("table.modal.actions.delete"),
    title: translate("table.danger"),
    visible: true,
    message: translate("table.messages.delete_msg")
  } as DeleteRecordDialogOptions;

  const defaultPagingFormManager = {
    itemsPerPageLabel: translate("table.pagination.items_per_page"),
    showingLabel: translate("table.pagination.showing"),
    totalLabel: translate("table.pagination.total"),
    toLabel: translate("table.pagination.to"),
    pageSize: 10
  } as PagingOptions;

  const defaultSearchFormManager = {
    searchTablePlaceholder: translate("table.messages.search_msg")
  };

  const defaultTableFormManager = {
    isTableInvisible: false,
    loading: false,
    locale: {
      emptyText: translate("table.empty_text"),
      filterConfirmText: translate("table.filter_confirm"),
      filterResetText: translate("table.filter_reset"),
      triggerDesc: translate("table.sort_desc"),
      triggerAsc: translate("table.sort_asc"),
      cancelSort: translate("table.cancel_sort")
    },
    recordStartEditingBehavior: "row",
    createActionPosition: "topRight",
    allowCreate: true,
    addButtonText: translate("table.modal.actions.add"),
    allowUpdate: true,
    allowDelete: true,
    updateRowButtonLabel: translate("table.update"),
    removeRowButtonLabel: translate("table.remove")
  };

  return (
    <DataGrid
      className={className}
      style={style}
      headerFormManager={{ ...defaultHeaderFormManager, ...headerFormManager }}
      createModalFormManager={{
        ...defaultCreateModalFormManager,
        ...createModalFormManager
      }}
      updateModalFormManager={{
        ...defaultUpdateModalFormManager,
        ...updateModalFormManager
      }}
      deleteModalFormManager={{
        ...defaultDeleteModalFormManager,
        ...deleteModalFormManager
      }}
      pagingFormManager={
        pagingVisible
          ? { ...defaultPagingFormManager, ...pagingFormManager }
          : ({} as any)
      }
      tableFormManager={
        { ...defaultTableFormManager, ...tableFormManager } as TableOptions
      }
      searchFormManager={{ ...defaultSearchFormManager, ...searchFormManager }}
      onEndUpdate={onEndUpdate}
      onStartUpdate={onStartUpdate}
      onStartCreate={onStartCreate}
      onEndCreate={onEndCreate}
      onCancelCreateModal={onCancelCreateModal}
      onCancelUpdateModal={onCancelUpdateModal}
    />
  );
};

export default Table;
