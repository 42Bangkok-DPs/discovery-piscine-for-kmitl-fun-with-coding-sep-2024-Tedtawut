if [ $# -eq 0 ]; then
	echo "No arguments supplied"
	exit 1
fi

for arg in "${@:1:3}"; do
	echo "$arg"
done
