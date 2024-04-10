declare global {
  type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

  type NavigationRailItem = {
    id: string,
    title: string,
    icon: Icon,
  }

  type Rail = {
    id: string;
    icon: Icon;
    title: string;
  };
  
  type TableHeader = {
    id: string,
    text: string,
    max?: number,
    align?: "left" | "right" | "center",
  }

  type DialogQueueItem = {
    id: string;
    show: boolean,
    title: string;
    message: string;
    ok?: DialogButton;
    cancel?: DialogButton | null;
    dismissible?: boolean;
    dialogHide?: () => void;
  };

  type DialogButton = {
    text: string,
    error?: boolean,
    click: () => void,
  }
}

export {}