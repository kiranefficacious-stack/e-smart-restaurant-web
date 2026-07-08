cat << 'INNER_EOF' > replacement.txt
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center justify-between flex-1 ml-10">
              <div className="flex items-center gap-6 xl:gap-8">
                <a href="#poss" className="flex items-center gap-1 bg-red-50 text-gray-900 px-3 py-1.5 rounded-md font-medium text-sm hover:bg-red-100 transition-colors">POSS <ChevronDown className="w-4 h-4 text-gray-600" /></a>
                <a href="#addons" className="flex items-center gap-1 text-gray-900 font-medium text-sm hover:text-gray-600 transition-colors">Add ons <ChevronDown className="w-4 h-4 text-gray-600" /></a>
                <a href="#outlet-types" className="flex items-center gap-1 text-gray-900 font-medium text-sm hover:text-gray-600 transition-colors">Outlet types <ChevronDown className="w-4 h-4 text-gray-600" /></a>
                <a href="#pricing" className="text-gray-900 font-medium text-sm hover:text-gray-600 transition-colors">Pricing</a>
              </div>
              <div className="flex items-center gap-6 xl:gap-8">
                <a href="#resources" className="flex items-center gap-1 text-gray-900 font-medium text-sm hover:text-gray-600 transition-colors">Resources <ChevronDown className="w-4 h-4 text-gray-600" /></a>
                <a href="#contact" className="px-5 py-2 border border-gray-800 text-gray-900 font-medium text-sm rounded hover:bg-gray-50 transition-colors">
                  Book A Demo
                </a>
              </div>
            </div>
INNER_EOF
sed -i -e '/{[/]\* Desktop Menu \*[/]}/,/<[/]div>/c\' -e "$(cat replacement.txt)" src/App.tsx
