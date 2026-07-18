using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;
using System.Windows.Forms;

namespace FloscasEditor
{
    static class Program
    {
        [STAThread]
        static void Main()
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new EditorForm());
        }
    }

    public sealed class EditorForm : Form
    {
        readonly Color Paper = Color.FromArgb(246, 244, 238);
        readonly Color Ink = Color.FromArgb(18, 21, 18);
        readonly Color Muted = Color.FromArgb(111, 112, 105);
        readonly Color Line = Color.FromArgb(214, 212, 204);
        readonly Color Forest = Color.FromArgb(24, 43, 31);
        readonly Color Moss = Color.FromArgb(52, 78, 59);

        readonly TextBox api = new TextBox();
        readonly TextBox key = new TextBox();
        readonly TextBox fileName = new TextBox();
        readonly TextBox title = new TextBox();
        readonly TextBox summary = new TextBox();
        readonly TextBox tags = new TextBox();
        readonly ComboBox category = new ComboBox();
        readonly DateTimePicker date = new DateTimePicker();
        readonly RichTextBox body = new RichTextBox();
        readonly Label status = new Label();
        readonly Label count = new Label();
        Button publish;
        Timer fadeTimer;

        readonly string settingsPath = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData),
            "Floscas",
            "editor.settings");

        public EditorForm()
        {
            Text = "Floscas Writer";
            Icon = CreateAppIcon();
            MinimumSize = new Size(920, 620);
            Size = new Size(1180, 720);
            StartPosition = FormStartPosition.CenterScreen;
            BackColor = Paper;
            ForeColor = Ink;
            Font = new Font("Segoe UI", 10F);
            AutoScaleMode = AutoScaleMode.None;
            Opacity = 0;

            BuildInterface();
            LoadSettings();
            NewArticle();
            Shown += delegate { FadeIn(); };
        }

        void BuildInterface()
        {
            var root = new Panel
            {
                Dock = DockStyle.Fill,
                BackColor = Paper
            };
            Controls.Add(root);

            Control header = BuildHeader();
            header.Dock = DockStyle.None;

            Control footer = BuildFooter();
            footer.Dock = DockStyle.None;

            var workspace = new TableLayoutPanel
            {
                Dock = DockStyle.None,
                ColumnCount = 2,
                RowCount = 1,
                BackColor = Paper
            };
            workspace.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 40));
            workspace.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 60));
            workspace.RowStyles.Add(new RowStyle(SizeType.Percent, 100));
            workspace.Controls.Add(BuildDetailsPanel(), 0, 0);
            workspace.Controls.Add(BuildEditorPanel(), 1, 0);
            root.Controls.Add(workspace);
            root.Controls.Add(footer);
            root.Controls.Add(header);

            Action layout = delegate
            {
                int side = root.ClientSize.Width < 1050 ? 24 : 36;
                int top = 24;
                int bottom = 20;
                int headerHeight = 88;
                int footerHeight = 58;
                int width = Math.Max(200, root.ClientSize.Width - side * 2);
                int workspaceTop = top + headerHeight;
                int footerTop = Math.Max(workspaceTop + 160, root.ClientSize.Height - bottom - footerHeight);

                header.SetBounds(side, top, width, headerHeight);
                workspace.SetBounds(side, workspaceTop, width, Math.Max(140, footerTop - workspaceTop));
                footer.SetBounds(side, footerTop, width, footerHeight);
            };
            root.Resize += delegate { layout(); };
            layout();
        }

        Control BuildHeader()
        {
            var header = new Panel { Dock = DockStyle.Fill };

            var copy = new Panel { Dock = DockStyle.Fill };
            copy.Controls.Add(new Label
            {
                Text = "FLOSCAS  /  WRITER",
                AutoSize = true,
                Font = new Font("Segoe UI", 8.5F, FontStyle.Bold),
                Location = new Point(0, 1),
                ForeColor = Muted
            });
            copy.Controls.Add(new Label
            {
                Text = "Write something worth keeping.",
                AutoSize = true,
                Font = new Font("Georgia", 24F),
                Location = new Point(0, 24),
                ForeColor = Ink
            });

            header.Controls.Add(copy);
            return header;
        }

        Control BuildDetailsPanel()
        {
            var host = new Panel { Dock = DockStyle.Fill, Padding = new Padding(0, 8, 32, 8) };
            var details = new TableLayoutPanel
            {
                Dock = DockStyle.Fill,
                ColumnCount = 2,
                AutoScroll = true,
                BackColor = Paper,
                Padding = new Padding(0, 0, 4, 12)
            };
            details.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 52));
            details.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 48));
            host.Controls.Add(details);

            AddSectionHeading(details, "01  ARTICLE DETAILS", 0, 2);
            AddField(details, "TITLE", title, 0, 2);
            summary.Multiline = true;
            summary.Height = 76;
            AddField(details, "SHORT SUMMARY", summary, 0, 2);

            category.DropDownStyle = ComboBoxStyle.DropDownList;
            category.Items.AddRange(new object[] { "札记", "随笔", "诗歌" });
            AddPairedFields(details, "SECTION", category, "PUBLISH DATE", date);

            date.Format = DateTimePickerFormat.Custom;
            date.CustomFormat = "yyyy-MM-dd  HH:mm";
            AddPairedFields(details, "FILE NAME", fileName, "TAGS", tags);

            return host;
        }

        Control BuildEditorPanel()
        {
            var editor = new Panel { Dock = DockStyle.Fill, Padding = new Padding(34, 8, 0, 8), BackColor = Paper };
            var heading = new Label
            {
                Text = "02  TEXT",
                Dock = DockStyle.Top,
                Height = 32,
                ForeColor = Muted,
                Font = new Font("Segoe UI", 8.5F, FontStyle.Bold)
            };
            body.BorderStyle = BorderStyle.None;
            body.Dock = DockStyle.Fill;
            body.BackColor = Paper;
            body.ForeColor = Ink;
            body.Font = new Font("Microsoft YaHei UI", 13F);
            body.AcceptsTab = true;
            body.DetectUrls = true;
            body.SelectionIndent = 2;
            body.TextChanged += delegate { count.Text = body.TextLength + " characters"; };

            count.Dock = DockStyle.Bottom;
            count.Height = 28;
            count.TextAlign = ContentAlignment.MiddleRight;
            count.ForeColor = Muted;
            count.Font = new Font("Segoe UI", 8.5F);

            editor.Controls.Add(body);
            editor.Controls.Add(count);
            editor.Controls.Add(heading);
            return editor;
        }

        Control BuildFooter()
        {
            var footer = new TableLayoutPanel { Dock = DockStyle.Fill, ColumnCount = 2, Padding = new Padding(0, 13, 0, 0) };
            footer.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 100));
            footer.ColumnStyles.Add(new ColumnStyle(SizeType.AutoSize));

            var left = new FlowLayoutPanel { Dock = DockStyle.Fill, FlowDirection = FlowDirection.LeftToRight, WrapContents = false };
            status.Text = "Ready";
            status.AutoSize = false;
            status.Width = 270;
            status.Height = 34;
            status.TextAlign = ContentAlignment.MiddleLeft;
            status.ForeColor = Muted;
            left.Controls.Add(status);

            var actions = new FlowLayoutPanel { AutoSize = true, FlowDirection = FlowDirection.LeftToRight, WrapContents = false };
            actions.Controls.Add(ActionButton("New", delegate { NewArticle(); }, false));
            actions.Controls.Add(ActionButton("Open", delegate { OpenDraft(); }, false));
            actions.Controls.Add(ActionButton("Save", delegate { SaveDraft(); }, false));
            actions.Controls.Add(ActionButton("Connect", delegate { ShowConnectionDialog(); }, false));
            publish = ActionButton("Publish", async delegate { await PublishAsync(); }, true);
            publish.Width = 116;
            actions.Controls.Add(publish);

            footer.Controls.Add(left, 0, 0);
            footer.Controls.Add(actions, 1, 0);
            return footer;
        }

        void AddSectionHeading(TableLayoutPanel panel, string text, int column, int span)
        {
            var label = new Label
            {
                Text = text,
                AutoSize = false,
                Dock = DockStyle.Top,
                Height = 34,
                ForeColor = Muted,
                Font = new Font("Segoe UI", 8.5F, FontStyle.Bold),
                Margin = new Padding(0, 0, 0, 8)
            };
            int row = panel.RowCount;
            panel.RowCount = row + 1;
            panel.RowStyles.Add(new RowStyle(SizeType.Absolute, 42));
            panel.Controls.Add(label, column, row);
            panel.SetColumnSpan(label, span);
        }

        void AddField(TableLayoutPanel panel, string labelText, Control control, int column, int span)
        {
            bool multiline = control is TextBox && ((TextBox)control).Multiline;
            var wrapper = new Panel { Dock = DockStyle.Top, Height = multiline ? 116 : 76, Margin = new Padding(column == 1 ? 10 : 0, 0, column == 0 && span == 1 ? 10 : 0, 6) };
            var label = new Label
            {
                Text = labelText,
                Dock = DockStyle.Top,
                Height = 24,
                ForeColor = Muted,
                Font = new Font("Segoe UI", 8F, FontStyle.Bold)
            };
            StyleInput(control);
            control.Dock = DockStyle.Top;
            control.Height = multiline ? 76 : 36;
            wrapper.Controls.Add(control);
            wrapper.Controls.Add(label);
            int row = panel.RowCount;
            panel.RowCount = row + 1;
            panel.RowStyles.Add(new RowStyle(SizeType.Absolute, wrapper.Height + 6));
            panel.Controls.Add(wrapper, column, row);
            panel.SetColumnSpan(wrapper, span);
        }

        void AddPairedFields(TableLayoutPanel panel, string leftLabel, Control leftControl, string rightLabel, Control rightControl)
        {
            var pair = new TableLayoutPanel
            {
                Dock = DockStyle.Top,
                Height = 82,
                ColumnCount = 2,
                RowCount = 1,
                Margin = new Padding(0, 0, 0, 6)
            };
            pair.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 50));
            pair.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 50));
            pair.RowStyles.Add(new RowStyle(SizeType.Percent, 100));
            AddPairItem(pair, leftLabel, leftControl, 0);
            AddPairItem(pair, rightLabel, rightControl, 1);

            int row = panel.RowCount;
            panel.RowCount = row + 1;
            panel.RowStyles.Add(new RowStyle(SizeType.Absolute, 88));
            panel.Controls.Add(pair, 0, row);
            panel.SetColumnSpan(pair, 2);
        }

        void AddPairItem(TableLayoutPanel pair, string labelText, Control control, int column)
        {
            var wrapper = new Panel
            {
                Dock = DockStyle.Fill,
                Margin = new Padding(column == 0 ? 0 : 10, 0, column == 0 ? 10 : 0, 0)
            };
            var label = new Label
            {
                Text = labelText,
                Dock = DockStyle.Top,
                Height = 24,
                ForeColor = Muted,
                Font = new Font("Segoe UI", 8F, FontStyle.Bold)
            };
            StyleInput(control);
            control.Dock = DockStyle.Top;
            control.Height = 36;
            wrapper.Controls.Add(control);
            wrapper.Controls.Add(label);
            pair.Controls.Add(wrapper, column, 0);
        }

        void StyleInput(Control control)
        {
            control.BackColor = Color.FromArgb(250, 249, 245);
            control.ForeColor = Ink;
            control.Font = new Font("Segoe UI", 10F);
            if (control is TextBox) ((TextBox)control).BorderStyle = BorderStyle.FixedSingle;
        }

        Button ActionButton(string text, EventHandler action, bool primary)
        {
            var button = new Button
            {
                Text = text,
                AutoSize = false,
                Width = 76,
                Height = 36,
                FlatStyle = FlatStyle.Flat,
                BackColor = primary ? Forest : Paper,
                ForeColor = primary ? Paper : Ink,
                Margin = new Padding(8, 0, 0, 0),
                Cursor = Cursors.Hand
            };
            button.FlatAppearance.BorderColor = primary ? Forest : Line;
            button.FlatAppearance.BorderSize = 1;
            button.MouseEnter += delegate { button.BackColor = primary ? Moss : Color.FromArgb(238, 236, 229); };
            button.MouseLeave += delegate { button.BackColor = primary ? Forest : Paper; };
            button.Click += action;
            return button;
        }

        void FadeIn()
        {
            fadeTimer = new Timer { Interval = 16 };
            fadeTimer.Tick += delegate
            {
                Opacity = Math.Min(1, Opacity + 0.12);
                if (Opacity >= 1)
                {
                    fadeTimer.Stop();
                    fadeTimer.Dispose();
                    fadeTimer = null;
                }
            };
            fadeTimer.Start();
        }

        void ShowConnectionDialog()
        {
            using (var dialog = new Form())
            {
                dialog.Text = "Connection";
                dialog.Icon = Icon;
                dialog.Size = new Size(560, 275);
                dialog.MinimumSize = new Size(500, 260);
                dialog.StartPosition = FormStartPosition.CenterParent;
                dialog.BackColor = Paper;
                dialog.ForeColor = Ink;
                dialog.Font = new Font("Segoe UI", 10F);
                dialog.FormBorderStyle = FormBorderStyle.FixedDialog;
                dialog.MaximizeBox = false;
                dialog.MinimizeBox = false;

                var heading = new Label
                {
                    Text = "Connect Floscas",
                    AutoSize = true,
                    Font = new Font("Georgia", 20F),
                    Location = new Point(30, 22),
                    ForeColor = Ink
                };
                var apiLabel = new Label { Text = "API ADDRESS", AutoSize = true, Location = new Point(32, 76), ForeColor = Muted, Font = new Font("Segoe UI", 8F, FontStyle.Bold) };
                var apiInput = new TextBox { Text = api.Text, Location = new Point(32, 98), Width = 480, Height = 34, BorderStyle = BorderStyle.FixedSingle };
                var keyLabel = new Label { Text = "ADMIN KEY", AutoSize = true, Location = new Point(32, 142), ForeColor = Muted, Font = new Font("Segoe UI", 8F, FontStyle.Bold) };
                var keyInput = new TextBox { Text = key.Text, Location = new Point(32, 164), Width = 360, Height = 34, BorderStyle = BorderStyle.FixedSingle, UseSystemPasswordChar = true };
                var save = ActionButton("Save", delegate { dialog.DialogResult = DialogResult.OK; dialog.Close(); }, true);
                save.Location = new Point(406, 162);
                save.Width = 106;

                dialog.Controls.Add(heading);
                dialog.Controls.Add(apiLabel);
                dialog.Controls.Add(apiInput);
                dialog.Controls.Add(keyLabel);
                dialog.Controls.Add(keyInput);
                dialog.Controls.Add(save);
                dialog.AcceptButton = save;

                if (dialog.ShowDialog(this) == DialogResult.OK)
                {
                    api.Text = apiInput.Text.Trim();
                    key.Text = keyInput.Text;
                    SaveSettings();
                    status.Text = "Connection saved";
                }
            }
        }

        void NewArticle()
        {
            fileName.Text = "new-note.md";
            title.Text = "";
            summary.Text = "";
            tags.Text = "札记";
            category.SelectedIndex = 0;
            date.Value = DateTime.Now;
            body.Text = "从这里开始写作。\n";
            status.Text = "New article";
            title.Focus();
        }

        string BuildMarkdown()
        {
            string safeTitle = title.Text.Replace("\"", "\\\"");
            string safeSummary = summary.Text.Replace("\"", "\\\"").Replace("\r", " ").Replace("\n", " ");
            var tagValues = new List<string>();
            foreach (string value in tags.Text.Split(','))
                if (!String.IsNullOrWhiteSpace(value)) tagValues.Add("\"" + value.Trim().Replace("\"", "") + "\"");

            return "---\n" +
                "title: \"" + safeTitle + "\"\n" +
                "date: " + date.Value.ToString("yyyy-MM-ddTHH:mm:sszzz") + "\n" +
                "draft: false\n" +
                (String.IsNullOrWhiteSpace(safeSummary) ? "" : "description: \"" + safeSummary + "\"\n") +
                "tags: [" + String.Join(", ", tagValues.ToArray()) + "]\n" +
                "categories: [\"" + category.Text + "\"]\n" +
                "---\n\n" + body.Text.Trim() + "\n";
        }

        async Task PublishAsync()
        {
            if (String.IsNullOrWhiteSpace(api.Text) || String.IsNullOrWhiteSpace(key.Text))
            {
                ShowConnectionDialog();
                if (String.IsNullOrWhiteSpace(api.Text) || String.IsNullOrWhiteSpace(key.Text)) return;
            }
            if (String.IsNullOrWhiteSpace(fileName.Text) || String.IsNullOrWhiteSpace(title.Text) || String.IsNullOrWhiteSpace(body.Text))
            {
                MessageBox.Show("File name, title and text are required.", "Floscas Writer");
                return;
            }

            publish.Enabled = false;
            publish.Text = "Sending...";
            status.Text = "Publishing";
            try
            {
                SaveSettings();
                using (var client = new HttpClient())
                {
                    client.Timeout = TimeSpan.FromSeconds(45);
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", key.Text.Trim());
                    var payload = new Dictionary<string, object>
                    {
                        { "path", fileName.Text.Trim() },
                        { "content", BuildMarkdown() },
                        { "message", "Publish " + fileName.Text.Trim() + " from Floscas Writer" }
                    };
                    string json = new JavaScriptSerializer().Serialize(payload);
                    HttpResponseMessage response = await client.PutAsync(
                        api.Text.Trim().TrimEnd('/') + "/article",
                        new StringContent(json, Encoding.UTF8, "application/json"));
                    string result = await response.Content.ReadAsStringAsync();
                    if (!response.IsSuccessStatusCode)
                        throw new Exception("Server returned " + (int)response.StatusCode + ": " + result);

                    status.Text = "Published. Cloudflare is rebuilding the site.";
                    MessageBox.Show("Article submitted successfully.", "Published", MessageBoxButtons.OK, MessageBoxIcon.Information);
                }
            }
            catch (Exception error)
            {
                status.Text = "Publish failed";
                MessageBox.Show("API: " + api.Text.Trim() + "\n\n" + DescribeError(error), "Publish failed", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            finally
            {
                publish.Enabled = true;
                publish.Text = "Publish";
            }
        }

        static string DescribeError(Exception error)
        {
            var messages = new List<string>();
            for (Exception current = error; current != null; current = current.InnerException)
                if (!String.IsNullOrWhiteSpace(current.Message) && !messages.Contains(current.Message)) messages.Add(current.Message);
            return String.Join("\n", messages.ToArray());
        }

        void SaveDraft()
        {
            using (var dialog = new SaveFileDialog { Filter = "Markdown (*.md)|*.md", FileName = fileName.Text })
                if (dialog.ShowDialog() == DialogResult.OK)
                {
                    File.WriteAllText(dialog.FileName, BuildMarkdown(), new UTF8Encoding(false));
                    status.Text = "Draft saved";
                }
        }

        void OpenDraft()
        {
            using (var dialog = new OpenFileDialog { Filter = "Markdown (*.md)|*.md|Text (*.txt)|*.txt" })
                if (dialog.ShowDialog() == DialogResult.OK)
                {
                    body.Text = File.ReadAllText(dialog.FileName, Encoding.UTF8);
                    fileName.Text = Path.GetFileName(dialog.FileName);
                    status.Text = "Opened " + fileName.Text;
                }
        }

        void SaveSettings()
        {
            try
            {
                Directory.CreateDirectory(Path.GetDirectoryName(settingsPath));
                byte[] encrypted = ProtectedData.Protect(Encoding.UTF8.GetBytes(key.Text), null, DataProtectionScope.CurrentUser);
                File.WriteAllLines(settingsPath, new[] { api.Text.Trim(), Convert.ToBase64String(encrypted) });
            }
            catch { }
        }

        void LoadSettings()
        {
            api.Text = "https://choco-blog-20l.pages.dev/api/admin";
            try
            {
                string[] lines = File.ReadAllLines(settingsPath);
                if (lines.Length > 0) api.Text = lines[0];
                if (lines.Length > 1)
                    key.Text = Encoding.UTF8.GetString(ProtectedData.Unprotect(Convert.FromBase64String(lines[1]), null, DataProtectionScope.CurrentUser));
            }
            catch { }
        }

        Icon CreateAppIcon()
        {
            using (var bitmap = new Bitmap(64, 64))
            using (Graphics graphics = Graphics.FromImage(bitmap))
            {
                graphics.SmoothingMode = SmoothingMode.AntiAlias;
                graphics.Clear(Color.Transparent);
                using (var brush = new SolidBrush(Forest)) graphics.FillRectangle(brush, 3, 3, 58, 58);
                using (var font = new Font("Georgia", 35F, FontStyle.Regular, GraphicsUnit.Pixel))
                using (var brush = new SolidBrush(Paper))
                    graphics.DrawString("F", font, brush, new PointF(19, 12));
                IntPtr handle = bitmap.GetHicon();
                using (Icon temporary = Icon.FromHandle(handle)) return (Icon)temporary.Clone();
            }
        }
    }
}
