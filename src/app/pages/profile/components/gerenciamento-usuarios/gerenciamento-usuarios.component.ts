import { Component, OnInit, ViewChild } from "@angular/core";

import { UserService } from "src/app/controllers/user/user.service";

import { MatPaginator, PageEvent } from "@angular/material/paginator";

import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-gerenciamento-usuarios",
  templateUrl: "./gerenciamento-usuarios.component.html",
  styleUrls: ["./gerenciamento-usuarios.component.scss"],
})
export class GerenciamentoUsuariosComponent implements OnInit {
  public displayedColumns: string[] = [
    "cpf",
    "name",
    "email",
    "limited",
    "user_limited",
  ];
  public dataSource = new MatTableDataSource<UserElement>(USER_DATA);
  public length;
  public pageSize;
  public status = {
    loading: false,
    error: false,
    error_message: "Algo de errado aconteceu, tente novamente",
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private ctrlUser: UserService) {}
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getUsersData();
  }

  getUsersData(page = 1, per_page = 10) {
    this.ctrlUser.getUsers({ page, per_page }).then((res) => {
      const { data, info } = res.data;
      this.length = info.total;
      this.pageSize = info.per_page;
      this.dataSource = new MatTableDataSource<UserElement>(
        data.filter(user => user.isSalesman)
        .map((item) => ({ ...item, user_limited: item.limited }))
        .sort((a, b) => a.id - b.id)
      );
    });
  }

  restricUser(id: number, limit: boolean) {
    limit ? this.blockUser(id) : this.unlockUser(id);
  }

  private blockUser(id: number) {
    this.ctrlUser.blockUser(id + "").then(() => {
      this.dataSource.data = this.dataSource.data.map((item) => {
        return item.id === id
          ? { ...item, user_limited: true, limited: true }
          : item;
      });
    });
  }

  private unlockUser(id: number) {
    this.ctrlUser.unlockUser(id + "").then(() => {
      this.dataSource.data = this.dataSource.data.map((item) => {
        return item.id === id
          ? { ...item, user_limited: false, limited: false }
          : item;
      });
    });
  }

  onChangePage(event: PageEvent) {
    const pageSize = +event.pageSize;
    const currentPage = +event.pageIndex + 1;
    this.getUsersData(currentPage, pageSize);
  }
}

export interface UserElement {
  id: number;
  name: string;
  cpf: string;
  email: string;
  limited: boolean;
}

const USER_DATA: UserElement[] = [];
