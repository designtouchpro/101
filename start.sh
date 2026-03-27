#!/bin/zsh

# ═══════════════════════════════════════════════════════════════
# 🚀 Playgrounds Launcher
# Запускает все плейграунды одновременно
# ═══════════════════════════════════════════════════════════════

SCRIPT_DIR="${0:A:h}"

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Плейграунды: название=порт
PLAYGROUNDS=("index:3200" "html:3211" "js:3212" "css:3213" "react:3231" "vue:3232" "net:3201" "algo:3241" "patterns:3242" "swift:3215" "swiftui:3235" "teamlead:3251" "product:3252" "project:3253" "marketing:3254" "qa:3255")

# Массив для хранения PID процессов
PIDS=()

print_header() {
  echo ""
  echo "${CYAN}═══════════════════════════════════════════════════════════${NC}"
  echo "${CYAN}  🚀 Playgrounds Launcher${NC}"
  echo "${CYAN}═══════════════════════════════════════════════════════════${NC}"
  echo ""
}

print_status() {
  echo "${GREEN}✓${NC} $1"
}

print_info() {
  echo "${BLUE}ℹ${NC} $1"
}

print_warning() {
  echo "${YELLOW}⚠${NC} $1"
}

print_error() {
  echo "${RED}✗${NC} $1"
}

# Функция для проверки зависимостей (npm workspaces — общий node_modules)
check_deps() {
  if [ ! -d "$SCRIPT_DIR/node_modules" ]; then
    print_warning "node_modules не найден, устанавливаю зависимости (npm workspaces)..."
    (cd "$SCRIPT_DIR" && npm install)
  fi
}

# Функция для запуска плейграунда
start_playground() {
  local name=$1
  local port=$2
  
  check_deps
  
  print_status "Запуск $name на порту $port..."
  cd "$SCRIPT_DIR"
  npm run dev -w "$name" &
  PIDS+=($!)
}

# Функция для остановки всех процессов
stop_all() {
  echo ""
  print_info "Останавливаю все плейграунды..."
  
  # Убиваем все наши процессы
  for pid in ${PIDS[@]}; do
    kill $pid 2>/dev/null
  done
  
  # Убиваем все vite процессы на наших портах
  for item in $PLAYGROUNDS; do
    local port=${item#*:}
    lsof -ti :$port | xargs kill -9 2>/dev/null
  done
  
  # Убиваем tsx watch (для API сервера)
  pkill -f "tsx watch server" 2>/dev/null
  
  print_status "Все плейграунды остановлены"
  exit 0
}

# Обработка Ctrl+C
trap stop_all SIGINT SIGTERM

# Получить порт по имени
get_port() {
  local name=$1
  for item in $PLAYGROUNDS; do
    local n=${item%:*}
    local p=${item#*:}
    if [[ "$n" == "$name" ]]; then
      echo $p
      return
    fi
  done
}

# Основная логика
main() {
  print_header
  
  # Проверяем аргументы
  case "${1:-all}" in
    "all"|"")
      print_info "Запускаю все плейграунды..."
      echo ""
      
      for item in $PLAYGROUNDS; do
        local name=${item%:*}
        local port=${item#*:}
        start_playground "$name" "$port"
      done
      ;;
    "index"|"html"|"js"|"css"|"react"|"vue"|"net"|"algo"|"patterns"|"swift"|"swiftui"|"teamlead"|"product"|"project"|"marketing"|"qa")
      local port=$(get_port $1)
      print_info "Запускаю только $1 на порту $port..."
      echo ""
      start_playground "$1" "$port"
      ;;
    "stop")
      stop_all
      ;;
    "status")
      echo "${BLUE}Статус плейграундов:${NC}"
      echo ""
      for item in $PLAYGROUNDS; do
        local name=${item%:*}
        local port=${item#*:}
        if lsof -i :$port > /dev/null 2>&1; then
          print_status "$name (порт $port) - ${GREEN}работает${NC}"
        else
          print_error "$name (порт $port) - ${RED}не запущен${NC}"
        fi
      done
      exit 0
      ;;
    "help"|"-h"|"--help")
      echo "Использование: ./start.sh [команда]"
      echo ""
      echo "Команды:"
      echo "  all       - Запустить все плейграунды (по умолчанию)"
      echo "  index     - Запустить только Index"
      echo "  html      - Запустить только HTML 101"
      echo "  js        - Запустить только JS 101"
      echo "  css       - Запустить только CSS 101"
      echo "  react     - Запустить только React 101"
      echo "  vue       - Запустить только Vue 101"
      echo "  net       - Запустить только Net 101"
      echo "  algo      - Запустить только Algo 101"
      echo "  patterns  - Запустить только Patterns"
      echo "  swift     - Запустить только Swift"
      echo "  swiftui   - Запустить только SwiftUI"
      echo "  teamlead  - Запустить только TeamLead"
      echo "  product   - Запустить только Product"
      echo "  project   - Запустить только Project"
      echo "  marketing - Запустить только Marketing"
      echo "  qa        - Запустить только QA"
      echo "  stop      - Остановить все плейграунды"
      echo "  status    - Показать статус плейграундов"
      echo "  help      - Показать эту справку"
      echo ""
      echo "Порты:"
      echo "  Index:      http://localhost:3200"
      echo "  HTML 101:   http://localhost:3211"
      echo "  JS 101:     http://localhost:3212"
      echo "  CSS 101:    http://localhost:3213"
      echo "  React 101:  http://localhost:3231"
      echo "  Vue 101:    http://localhost:3232"
      echo "  Net 101:    http://localhost:3201"
      echo "  Algo 101:   http://localhost:3241"
      echo "  Patterns:   http://localhost:3242"
      echo "  Swift:      http://localhost:3215"
      echo "  SwiftUI:    http://localhost:3235"
      echo "  TeamLead:   http://localhost:3251"
      echo "  Product:    http://localhost:3252"
      echo "  Project:    http://localhost:3253"
      echo "  Marketing:  http://localhost:3254"
      echo "  QA:         http://localhost:3255"
      exit 0
      ;;
    *)
      print_error "Неизвестная команда: $1"
      echo "Используйте './start.sh help' для справки"
      exit 1
      ;;
  esac
  
  # Ждём немного для запуска серверов
  sleep 3
  
  echo ""
  echo "${GREEN}═══════════════════════════════════════════════════════════${NC}"
  echo "${GREEN}  ✅ Все плейграунды запущены!${NC}"
  echo "${GREEN}═══════════════════════════════════════════════════════════${NC}"
  echo ""
  echo "  ${YELLOW}Index:${NC}      http://localhost:3200"
  echo "  ${RED}HTML 101:${NC}   http://localhost:3211"
  echo "  ${YELLOW}JS 101:${NC}     http://localhost:3212"
  echo "  ${BLUE}CSS 101:${NC}    http://localhost:3213"
  echo "  ${CYAN}React 101:${NC}  http://localhost:3231"
  echo "  ${GREEN}Vue 101:${NC}    http://localhost:3232"
  echo "  ${BLUE}Net 101:${NC}    http://localhost:3201"
  echo "  ${CYAN}Algo 101:${NC}   http://localhost:3241"
  echo "  ${BLUE}Patterns:${NC}   http://localhost:3242"
  echo "  ${GREEN}Swift:${NC}      http://localhost:3215"
  echo "  ${YELLOW}SwiftUI:${NC}    http://localhost:3235"
  echo "  ${CYAN}TeamLead:${NC}   http://localhost:3251"
  echo "  ${GREEN}Product:${NC}    http://localhost:3252"
  echo "  ${BLUE}Project:${NC}    http://localhost:3253"
  echo "  ${RED}Marketing:${NC}  http://localhost:3254"
  echo "  ${YELLOW}QA:${NC}         http://localhost:3255"
  echo ""
  echo "  Нажмите ${RED}Ctrl+C${NC} для остановки всех плейграундов"
  echo ""
  
  # Ждём все фоновые процессы
  for pid in ${PIDS[@]}; do
    wait $pid 2>/dev/null
  done
}

main "$@"
