" This is the block I record my keybind methods
" g for quick jump
" <Space>n for new <sth>, new tab (nt) or new window (nw)
" <Space> for templaters, blankline (tb)

:set tabstop=4

" use H and L 

" unmap with J and K
" imap <C-e> <Esc>%%a
" unmap J from joint, I hate this so much

" nmap C-j J
" nmap C-k K

" Yank to system clipboard
set clipboard=unnamed

" nmap <zn> :nextday

" Go back and forward with Ctrl+O and Ctrl+I
" (make sure to remove default Obsidian shortcuts for these to work)

exmap surround_wiki surround [[ ]]
exmap surround_double_quotes surround " "
exmap surround_single_quotes surround ' '
exmap surround_brackets surround ( )
exmap surround_square_brackets surround [ ]
exmap surround_curly_brackets surround { }

" NOTE: must use 'map' and not 'nmap'
map [[ :surround_wiki
nunmap s
vunmap s
map s" :surround_double_quotes
map s' :surround_single_quotes
map sb :surround_brackets
map s( :surround_brackets
map s) :surround_brackets
map s[ :surround_square_brackets
map s[ :surround_square_brackets
map s{ :surround_curly_brackets
map s} :surround_curly_brackets

" Emulate Folding https://vimhelp.org/fold.txt.html#fold-commands
exmap togglefold obcommand editor:toggle-fold
nmap zo :togglefold<CR>
nmap zc :togglefold<CR>
nmap za :togglefold<CR>

exmap unfoldall obcommand editor:unfold-all
nmap zR :unfoldall<CR>

exmap foldall obcommand editor:fold-all
nmap zM :foldall<CR>

" Emulate Tab Switching https://vimhelp.org/tabpage.txt.html#gt
" requires Cycle Through Panes Plugins https://obsidian.md/plugins?id=cycle-through-panes
" exmap tabnext obcommand cycle-through-panes:cycle-through-panes
" nmap gt :tabnext
" exmap tabprev obcommand cycle-through-panes:cycle-through-panes-reverse
" nmap gT :tabprev
"

" Command to map obsidian commands

exmap back obcommand app:go-back
nmap <C-o> :back

exmap previoustab obcommand workspace:previous-tab
exmap nexttab obcommand workspace:next-tab
nmap H :previoustab<CR>
nmap L :nexttab<CR>

exmap golink obcommand editor:follow-link
nmap gl :golink<CR>

exmap govertical obcommand editor:open-link-in-new-split
nmap gv :govertical<CR>


" Make space the leader key
unmap <Space>
" unmap <Space><Space> 
nunmap <Space>
" iunmap <Space>

exmap savefile obcommand editor:save-file
nmap <Space>w :savefile<CR>

exmap h1 obcommand shortcuts-extender:heading-1
exmap h2 obcommand shortcuts-extender:heading-2
exmap h3 obcommand shortcuts-extender:heading-3
exmap h4 obcommand shortcuts-extender:heading-4
exmap h5 obcommand shortcuts-extender:heading-5
exmap h6 obcommand shortcuts-extender:heading-6
exmap h0 obcommand shortcuts-extender:heading-0

nmap <Space>1 :h1<CR>
nmap <Space>2 :h2<CR>
nmap <Space>3 :h3<CR>
nmap <Space>4 :h4<CR>
nmap <Space>5 :h5<CR>
nmap <Space>6 :h6<CR>
nmap <Space>0 :h0<CR>

" Maps pasteinto to Alt-p
nmap <Space>p :pasteinto<CR>

exmap tab1 obcommand workspace:goto-tab-1
exmap tab2 obcommand workspace:goto-tab-2
exmap tab3 obcommand workspace:goto-tab-3
exmap tab4 obcommand workspace:goto-tab-4
exmap tab5 obcommand workspace:goto-tab-5
exmap tab6 obcommand workspace:goto-tab-6
exmap tab7 obcommand workspace:goto-tab-7
exmap tab8 obcommand workspace:goto-tab-8

nmap g1 :tab1<CR>
nmap g2 :tab2<CR>
nmap g3 :tab3<CR>
nmap g4 :tab4<CR>
nmap g5 :tab5<CR>
nmap g6 :tab6<CR>
nmap g7 :tab7<CR>
nmap g8 :tab8<CR>

" get rid of annoying c-w

exmap vs obcommand workspace:split-vertical
nmap <Space>v :vs<CR>

exmap closetab obcommand workspace:close
nmap <Space>c :closetab<CR>

exmap newtab obcommand workspace:new-tab
nmap <Space>nt :newtab<CR>

exmap newwin obcommand workspace:open-in-new-window
nmap <Space>nw :newwin<CR>

nmap <Space>h :noh<CR>

" exmap leftsb obcommand app:toggle-left-sidebar
" exmap rightsb obcommand app:toggle-right-sidebar

" nmap <Space>l :leftsb
" nmap <Space>r :rightsb

nmap <C-u> 8kzz
nmap <C-d> 8jzz

" map space d to checklist

exmap CycleList obcommand editor:cycle-list-checklist
nmap <Space>d :CycleList<CR>

exmap OpenFileFinder obcommand switcher:open
nmap <Space>f :OpenFileFinder<CR>

" exmap GlobalSearch obcommand global-search:open
" nmap <Space>s :GlobalSearch

exmap OpenFileExplorer obcommand file-explorer:open
nmap <Space>e :OpenFileExplorer<CR>

exmap InsertTime obcommand templater-obsidian:attachments/Templater/time.md
nmap * :InsertTime

exmap lintfile obcommand obsidian-linter:lint-file
nmap <Space>lf :lintfile<CR>

exmap zoomin obcommand obsidian-zoom:zoom-in
nmap gh :zoomin<CR>

exmap zoomout obcommand obsidian-zoom:zoom-out
nmap gH :zoomout<CR>

" exmap highlight obcommand editor:toggle-highlight
" map <Space>h :highlight

