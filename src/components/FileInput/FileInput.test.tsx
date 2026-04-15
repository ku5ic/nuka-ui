import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FileInput } from "./FileInput";
import { FormField } from "@nuka/components/FormField";

function createFile(name: string, size: number, type = "text/plain"): File {
  const content = new Uint8Array(size);
  return new File([content], name, { type });
}

function createDropEvent(files: File[]): Partial<React.DragEvent> {
  return {
    preventDefault: vi.fn(),
    dataTransfer: { files } as unknown as DataTransfer,
  };
}

describe("FileInput", () => {
  describe("rendering", () => {
    it("renders a region with drag label", () => {
      render(<FileInput />);
      expect(screen.getByRole("region")).toBeInTheDocument();
    });

    it("renders a hidden file input", () => {
      const { container } = render(<FileInput />);
      const input = container.querySelector('input[type="file"]');
      expect(input).toBeInTheDocument();
    });

    it("displays drag and browse labels", () => {
      render(<FileInput dragLabel="Drop here or" browseLabel="select" />);
      expect(screen.getByText(/Drop here or/)).toBeInTheDocument();
      expect(screen.getByText("select")).toBeInTheDocument();
    });

    it("sets displayName", () => {
      expect(FileInput.displayName).toBe("FileInput");
    });
  });

  describe("default zone classes", () => {
    it("applies border-dashed base class", () => {
      render(<FileInput />);
      expect(screen.getByTestId("file-input-zone").className).toContain(
        "border-dashed",
      );
    });

    it("applies default intent classes when not dragging", () => {
      render(<FileInput />);
      const cls = screen.getByTestId("file-input-zone").className;
      expect(cls).toContain("border-(--nuka-border-base)");
      expect(cls).toContain("bg-(--nuka-bg-subtle)");
    });
  });

  describe("drag over state", () => {
    it("applies drag-over classes on dragOver", () => {
      render(<FileInput />);
      const zone = screen.getByTestId("file-input-zone");
      fireEvent.dragOver(zone, { preventDefault: vi.fn() });
      expect(zone.className).toContain("border-(--nuka-accent-border)");
      expect(zone.className).toContain("bg-(--nuka-accent-bg-subtle)");
    });

    it("removes drag-over classes on dragLeave", () => {
      render(<FileInput />);
      const zone = screen.getByTestId("file-input-zone");
      fireEvent.dragOver(zone, { preventDefault: vi.fn() });
      fireEvent.dragLeave(zone);
      expect(zone.className).toContain("border-(--nuka-border-base)");
    });
  });

  describe("drop", () => {
    it("adds files on drop and fires onFilesChange", () => {
      const spy = vi.fn();
      render(<FileInput onFilesChange={spy} multiple />);
      const zone = screen.getByTestId("file-input-zone");
      const file = createFile("test.txt", 1024);

      fireEvent.drop(zone, createDropEvent([file]));

      expect(spy).toHaveBeenCalledWith([file]);
      expect(screen.getByText("test.txt")).toBeInTheDocument();
      expect(screen.getByText("1 KB")).toBeInTheDocument();
    });

    it("does not add files when disabled", () => {
      const spy = vi.fn();
      render(<FileInput onFilesChange={spy} disabled />);
      const zone = screen.getByTestId("file-input-zone");
      fireEvent.drop(zone, createDropEvent([createFile("x.txt", 100)]));
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe("file input change", () => {
    it("adds files via native input change", () => {
      const spy = vi.fn();
      const { container } = render(<FileInput onFilesChange={spy} multiple />);
      const input = container.querySelector('input[type="file"]')!;
      const file = createFile("doc.pdf", 2_500_000);

      fireEvent.change(input, { target: { files: [file] } });

      expect(spy).toHaveBeenCalledWith([file]);
      expect(screen.getByText("doc.pdf")).toBeInTheDocument();
      expect(screen.getByText("2.4 MB")).toBeInTheDocument();
    });
  });

  describe("maxFiles", () => {
    it("caps files at maxFiles limit", () => {
      const spy = vi.fn();
      render(<FileInput onFilesChange={spy} maxFiles={2} multiple />);
      const zone = screen.getByTestId("file-input-zone");
      const files = [
        createFile("a.txt", 100),
        createFile("b.txt", 200),
        createFile("c.txt", 300),
      ];

      fireEvent.drop(zone, createDropEvent(files));

      expect(spy).toHaveBeenCalledWith([files[0], files[1]]);
      expect(screen.getByText("a.txt")).toBeInTheDocument();
      expect(screen.getByText("b.txt")).toBeInTheDocument();
      expect(screen.queryByText("c.txt")).not.toBeInTheDocument();
    });
  });

  describe("remove file", () => {
    it("removes file from list when dismiss button clicked", () => {
      const spy = vi.fn();
      render(<FileInput onFilesChange={spy} multiple />);
      const zone = screen.getByTestId("file-input-zone");
      const file = createFile("remove-me.txt", 100);

      fireEvent.drop(zone, createDropEvent([file]));
      expect(screen.getByText("remove-me.txt")).toBeInTheDocument();

      fireEvent.click(
        screen.getByRole("button", { name: "Remove remove-me.txt" }),
      );
      expect(screen.queryByText("remove-me.txt")).not.toBeInTheDocument();
      expect(spy).toHaveBeenLastCalledWith([]);
    });
  });

  describe("single file mode", () => {
    it("replaces file when multiple is not set", () => {
      const spy = vi.fn();
      render(<FileInput onFilesChange={spy} />);
      const zone = screen.getByTestId("file-input-zone");

      fireEvent.drop(zone, createDropEvent([createFile("first.txt", 100)]));
      expect(screen.getByText("first.txt")).toBeInTheDocument();

      fireEvent.drop(zone, createDropEvent([createFile("second.txt", 200)]));
      expect(screen.queryByText("first.txt")).not.toBeInTheDocument();
      expect(screen.getByText("second.txt")).toBeInTheDocument();
    });
  });

  describe("intent", () => {
    it("danger intent applies danger border class", () => {
      render(<FileInput intent="danger" />);
      expect(screen.getByTestId("file-input-zone").className).toContain(
        "border-(--nuka-danger-border)",
      );
    });

    it("danger intent sets aria-invalid on input", () => {
      const { container } = render(<FileInput intent="danger" />);
      const input = container.querySelector('input[type="file"]');
      expect(input).toHaveAttribute("aria-invalid", "true");
    });
  });

  describe("accept", () => {
    it("forwards accept attribute to native input", () => {
      const { container } = render(<FileInput accept=".pdf,.doc" />);
      const input = container.querySelector('input[type="file"]');
      expect(input).toHaveAttribute("accept", ".pdf,.doc");
    });
  });

  describe("FormField integration", () => {
    it("id from FormField applied to input", () => {
      const { container } = render(
        <FormField id="upload">
          <FileInput />
        </FormField>,
      );
      const input = container.querySelector('input[type="file"]');
      expect(input).toHaveAttribute("id", "upload");
    });

    it("aria-describedby includes error id", () => {
      const { container } = render(
        <FormField id="upload" error="File too large">
          <FileInput />
        </FormField>,
      );
      const input = container.querySelector('input[type="file"]');
      expect(input).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("upload-error"),
      );
    });

    it("aria-invalid from hasError", () => {
      const { container } = render(
        <FormField id="upload" error="File too large">
          <FileInput />
        </FormField>,
      );
      const input = container.querySelector('input[type="file"]');
      expect(input).toHaveAttribute("aria-invalid", "true");
    });

    it("disabled from FormField disables input", () => {
      const { container } = render(
        <FormField id="upload" disabled>
          <FileInput />
        </FormField>,
      );
      const input = container.querySelector('input[type="file"]');
      expect(input).toBeDisabled();
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to the file input element", () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<FileInput ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.type).toBe("file");
    });
  });

  describe("className override", () => {
    it("merges consumer className onto the outer wrapper", () => {
      const { container } = render(<FileInput className="mt-4" />);
      expect(container.firstElementChild?.className).toContain("mt-4");
    });
  });
});
